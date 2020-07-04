import React, { useState } from 'react';

import Header from '../Header';
import Main from '../Main';
import DataTable from '../DataTable';
import Loader from '../Loader';

import useCategoriesAndForces from '../../hooks/useCategoriesAndForces';
import { getCrimeReports } from '../../api';

const App = () => {
  const date = new Date();

  const [isLoading, categoryOptions, forceOptions] = useCategoriesAndForces();
  const [category, setCategory] = useState('');
  const [force, setForce] = useState('');
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [categoryIsInvalid, setCategoryIsInvalid] = useState(false);
  const [forceIsInvalid, setForceIsInvalid] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [reports, setReports] = useState([]);

  const handleSearch = () => {
    if (!category) return setCategoryIsInvalid(true);
    if (!force) return setForceIsInvalid(true);

    setCategoryIsInvalid(false);
    setForceIsInvalid(false);
    setIsFetching(true);

    setTimeout(() => {
      getCrimeReports(category, force, year, month)
        .then(reports => setReports(reports))
        .then(() => setIsFetching(false))
        .catch(error => console.log(error.message));
    }, 1000);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Header />
      <Main
        categoryOptions={categoryOptions}
        forceOptions={forceOptions}
        setCategory={setCategory}
        setForce={setForce}
        setYear={setYear}
        setMonth={setMonth}
        handleSearch={handleSearch}
        categoryIsInvalid={categoryIsInvalid}
        setCategoryIsInvalid={setCategoryIsInvalid}
        forceIsInvalid={forceIsInvalid}
        setForceIsInvalid={setForceIsInvalid}
      />
      <DataTable isFetching={isFetching} reports={reports} />
    </>
  );
};

export default App;
