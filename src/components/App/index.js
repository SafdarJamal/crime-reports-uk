import React, { Component, Fragment } from 'react';
import { categories, forces, crimeReports } from '../../api/UK_POLICE';

import Header from '../Header';
import Main from '../Main';
import DataTable from '../DataTable';
import Loader from '../Loader';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      categoryOptions: null,
      forceOptions: null,
      category: '',
      force: '',
      year: new Date().getFullYear(),
      month: new Date().getMonth() === 0 ? 1 : new Date().getMonth(),
      categoryIsInvalid: false,
      forceIsInvalid: false,
      fetchingReports: false,
      reports: null
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.getCrimeReports = this.getCrimeReports.bind(this);
  }

  componentDidMount() {
    Promise.all([categories(), forces()])
      .then(([categoryOptions, forceOptions]) => {
        this.setState({
          categoryOptions,
          forceOptions,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  handleSelect(name, value) {
    this.setState({ [name]: value });
  }

  getCrimeReports() {
    const { category, force, year, month } = this.state;

    let categoryIsInvalid = false;
    let forceIsInvalid = false;

    if (category === '') {
      categoryIsInvalid = true;
    }
    if (force === '') {
      forceIsInvalid = true;
    }

    if (categoryIsInvalid || forceIsInvalid) {
      return this.setState({ categoryIsInvalid, forceIsInvalid });
    }

    this.setState({ categoryIsInvalid, forceIsInvalid, fetchingReports: true });

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
      categoryIsInvalid,
      forceIsInvalid,
      fetchingReports,
      reports
    } = this.state;

    if (isLoading) {
      return <Loader />;
    }

    return (
      <Fragment>
        <Header />
        <Main
          categoryOptions={categoryOptions}
          forceOptions={forceOptions}
          categoryIsInvalid={categoryIsInvalid}
          forceIsInvalid={forceIsInvalid}
          handleSelect={this.handleSelect}
          getCrimeReports={this.getCrimeReports}
        />
        <DataTable fetchingReports={fetchingReports} reports={reports} />
      </Fragment>
    );
  }
}

export default App;
