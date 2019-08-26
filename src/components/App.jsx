import React, { Component, Fragment } from 'react';
import { categories, forces, crimeReports } from '../api/UK_POLICE';

import Loader from './Loader';
import Header from './Header';
import Main from './Main';
import DataTable from './DataTable';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      categoryOptions: null,
      forceOptions: null,
      category: '',
      force: '',
      categoryError: false,
      forceError: false,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      reports: null,
      fetchingReports: false
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.getCrimeReports = this.getCrimeReports.bind(this);
  }

  componentDidMount() {
    categories()
      .then(categoryOptions => {
        forces()
          .then(forceOptions => {
            this.setState({
              categoryOptions,
              forceOptions,
              isLoading: false
            });
          })
          .catch(error => console.log(`Getting Forces ==> ${error.message}`));
      })
      .catch(error => console.log(`Getting Categories ==> ${error.message}`));
  }

  handleSelect(name, value) {
    // console.log(name, value);
    this.setState({ [name]: value });
  }

  getCrimeReports() {
    const { category, force, year, month } = this.state;
    // console.log(category, force);

    let categoryError = false;
    let forceError = false;

    if (category === '') {
      categoryError = true;
    }
    if (force === '') {
      forceError = true;
    }

    if (categoryError || forceError) {
      return this.setState({ categoryError, forceError });
    }

    this.setState({ categoryError, forceError, fetchingReports: true });

    setTimeout(() => {
      crimeReports(category, force, year, month)
        .then(reports => {
          this.setState({ reports, fetchingReports: false });
        })
        .catch(error =>
          console.log(`Getting Crime Reports ==> ${error.message}`)
        );
    }, 1000);
  }

  render() {
    const {
      isLoading,
      categoryOptions,
      forceOptions,
      // category,
      // force,
      categoryError,
      forceError,
      reports,
      fetchingReports
    } = this.state;

    // console.log(reports);
    // console.log('===>', category, force);

    if (isLoading) {
      return <Loader />;
    }

    return (
      <Fragment>
        <Header />
        <Main
          categoryOptions={categoryOptions}
          forceOptions={forceOptions}
          categoryError={categoryError}
          forceError={forceError}
          handleSelect={this.handleSelect}
          getCrimeReports={this.getCrimeReports}
        />
        <DataTable reports={reports} fetchingReports={fetchingReports} />
      </Fragment>
    );
  }
}

export default App;
