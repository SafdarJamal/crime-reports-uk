import React, { useState } from 'react';

import Header from '../Header';
import Main from '../Main';
import DataTable from '../DataTable';
import Loader from '../Loader';

import useCategoriesAndForces from '../../hooks/useCategoriesAndForces';

const App = () => {
  const date = new Date();

  const [isLoading, categoryOptions, forceOptions] = useCategoriesAndForces();
  const [category, setCategory] = useState('');
  const [force, setForce] = useState('');
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [categoryIsInvalid, setCategoryIsInvalid] = useState(false);
  const [forceIsInvalid, setForceIsInvalid] = useState(false);
  const [fetchingReports, setFetchingReports] = useState(false);
  const [reports, setReports] = useState([]);

  const getCrimeReports = () => {
    if (!category && !force) {
      setCategoryIsInvalid(true);
      setForceIsInvalid(true);
      return;
    }

    setCategoryIsInvalid(false);
    setForceIsInvalid(false);
    setFetchingReports(true);

    setTimeout(() => {
      fetch(
        `https://data.police.uk/api/crimes-no-location?category=${category}&force=${force}&date=${year}-${month}`
      )
        .then(response => response.json())
        .then(reports => setReports(reports))
        .then(() => fetchingReports(false))
        .catch(error => console.log(error.message));
    }, 1000);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Main
        categoryOptions={categoryOptions}
        forceOptions={forceOptions}
        categoryIsInvalid={categoryIsInvalid}
        forceIsInvalid={forceIsInvalid}
        setCategory={setCategory}
        setForce={setForce}
        setYear={setYear}
        setMonth={setMonth}
        getCrimeReports={getCrimeReports}
      />
      <DataTable fetchingReports={fetchingReports} reports={reports} />
    </>
  );
};

export default App;
