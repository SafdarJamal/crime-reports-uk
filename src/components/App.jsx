import React, { Component, Fragment } from 'react';
import { Pane, toaster } from 'evergreen-ui';
import { categories, forces, crimeReports } from '../api/UK_POLICE';

import Header from './Header';
import SelectInput from './SelectInput';
import PrimaryButton from './PrimaryButton';
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
    categories().then(value1 => {
      forces().then(value2 => {
        this.setState({ categoryOptions: value1, forceOptions: value2 });
        // console.log(value1, value2);
      });
    });
  }

  handleSelect(value, num) {
    const { category, force } = this.state;
    // console.log(value, num);
    if (num === 1) {
      if (value !== category && value.charAt(value.length - 1) !== '!') {
        this.setState({ category: value });
      } else if (value.charAt(value.length - 1) === '!') {
        toaster.notify(value);
      }
      return false;
    } else if (num === 2) {
      if (value !== force && value.charAt(value.length - 1) !== '!') {
        this.setState({ force: value });
      } else if (value.charAt(value.length - 1) === '!') {
        toaster.notify(value);
      }
      return false;
    }
  }

  getCrimeReports() {
    const { category, force } = this.state;
    // console.log('>>>>>>>', category, force);
    if (category === null) {
      toaster.notify('Please Select Crime Category !');
      return false;
    } else if (force === null) {
      toaster.notify('Please Select Police Force !');
      return false;
    }
    crimeReports(category, force).then(value => {
      this.setState({ reports: value, category: null, force: null });
    });
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
        <Pane
          elevation={1}
          marginTop={25}
          height={240}
          width="100%"
          paddingRight={25}
          paddingLeft={25}
          background="tint2"
          alignItems="center"
          justifyContent="center"
          border="default"
        >
          <SelectInput
            options={categoryOptions}
            selected="Select Crime Category"
            handleClick={this.handleSelect}
            num={1}
          />
          <SelectInput
            options={forceOptions}
            selected="Select Police Force"
            handleClick={this.handleSelect}
            num={2}
          />
          <PrimaryButton getData={this.getCrimeReports} />
        </Pane>
        <DataTable reports={reports} />
      </Fragment>
    );
  }
}

export default App;
