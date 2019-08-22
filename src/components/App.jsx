import React, { Component, Fragment } from 'react';
import { toaster } from 'evergreen-ui';
import { categories, forces, crimeReports } from '../api/UK_POLICE';

import Header from './Header';
import Main from './Main';
import DataTable from './DataTable';

class App extends Component {
  constructor() {
    super();

    this.state = {
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
      .then(value1 => {
        forces().then(value2 => {
          this.setState({ categoryOptions: value1, forceOptions: value2 });
          // console.log(value1, value2);
        });
      })
      .catch(error => console.log(`===> ${error.message}`));
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
      .catch(error => console.log(error.message));
  }

  render() {
    const {
      categoryOptions,
      forceOptions,
      // category,
      // force,
      reports
    } = this.state;

    // console.log(reports);
    // console.log('===>', category, force);

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
