import React, { Component, Fragment } from 'react';
import { toaster } from 'evergreen-ui';
import { categories, forces, crimeReports } from '../api/UK_POLICE';

import Loader from './Loader';
import Header from './Header';
import Main from './Main';
import DataTable from './DataTable';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      categoryOptions: null,
      forceOptions: null,
      category: null,
      force: null,
      reports: null
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
          .catch(error => console.log(`Get Forces ==> ${error.message}`));
      })
      .catch(error => console.log(`Get Categories ==> ${error.message}`));
  }

  handleSelect(name, value) {
    // console.log(name, value);

    this.setState({ [name]: value });
  }

  getCrimeReports() {
    const { category, force } = this.state;
    // console.log(category, force);

    if (category === '') {
      return toaster.notify('Please Select Crime Category !');
    }
    if (force === '') {
      return toaster.notify('Please Select Police Force !');
    }

    crimeReports(category, force)
      .then(value => {
        this.setState({ reports: value, category: null, force: null });
      })
      .catch(error => console.log(`Get Crime Reports ==> ${error.message}`));
  }

  render() {
    const {
      isLoading,
      categoryOptions,
      forceOptions,
      // category,
      // force,
      reports
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
          handleSelect={this.handleSelect}
          getCrimeReports={this.getCrimeReports}
        />
        <DataTable reports={reports} />
      </Fragment>
    );
  }
}

export default App;
