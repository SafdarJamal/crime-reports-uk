import React, { Component, Fragment } from 'react';
import Header from './components/Header.jsx';
import SelectInput from './components/SelectInput.jsx';
import PrimaryButton from './components/PrimaryButton.jsx';
import DataTable from './components/DataTable.jsx';

import { Pane, toaster } from 'evergreen-ui';

import categories from './apis/categories';
import forces from './apis/forces';
import crimeReports from './apis/crimeReports';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryOptions: null,
      forceOptions: null,
      category: null,
      force: null,
      reports: null
    };

    this.getCrimeReports = this.getCrimeReports.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    categories().then(value1 => {
      forces().then(value2 => {
        this.setState({ categoryOptions: value1, forceOptions: value2 });
        console.log(value1, value2);
      });
    });
  }

  handleSelect(value, num) {
    console.log(value, num);
    if (num === 1) {
      this.setState({ category: value });
    } else if (num === 2) {
      this.setState({ force: value });
    }
    if (value.charAt(value.length - 1) === '!') {
      toaster.notify(value);
    }
  }

  getCrimeReports() {
    const { category, force } = this.state;
    console.log('5644454', category, force);
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
      category,
      force,
      reports
    } = this.state;
    console.log(reports);
    console.log('===>', category, force);
    return (
      <Fragment>
        <Header />
        <Pane
          elevation={1}
          marginTop={25}
          height={240}
          width="100%"
          // display="flex"
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
