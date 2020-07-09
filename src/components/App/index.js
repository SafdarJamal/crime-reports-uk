import React, { useState, useEffect, useRef } from 'react';

import Loader from '../Loader';
import Header from '../Header';
import Main from '../Main';
import DataTable from '../DataTable';

import { getCategories, getForces, getCrimeReports } from '../../api';

const App = () => {
  const date = new Date();

  const [isLoading, setIsLoading] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [forceOptions, setForceOptions] = useState([]);
  const [category, setCategory] = useState('');
  const [force, setForce] = useState('');
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [categoryIsInvalid, setCategoryIsInvalid] = useState(false);
  const [forceIsInvalid, setForceIsInvalid] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [reports, setReports] = useState([]);

  const bottomRef = useRef();

  useEffect(() => {
    Promise.all([getCategories(), getForces()])
      .then(([categoryOptions, forceOptions]) => {
        setCategoryOptions(categoryOptions);
        setForceOptions(forceOptions);
        setIsLoading(false);
      })
      .catch(error => console.log(error.message));
  }, []);

  const handleSearch = event => {
    event.preventDefault();

    if (!category) return setCategoryIsInvalid(true);
    if (!force) return setForceIsInvalid(true);

    setCategoryIsInvalid(false);
    setForceIsInvalid(false);
    setIsFetching(true);

    setTimeout(() => {
      getCrimeReports(category, force, year, month)
        .then(reports => setReports(reports))
        .then(() => setIsFetching(false))
        .then(() => scrollBottom())
        .catch(error => console.log(error.message));
    }, 1000);
  };

  const scrollBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
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
        forceIsInvalid={forceIsInvalid}
        setCategoryIsInvalid={setCategoryIsInvalid}
        setForceIsInvalid={setForceIsInvalid}
        isFetching={isFetching}
      />
      <DataTable
        isFetching={isFetching}
        reports={reports}
        bottomRef={bottomRef}
      />
    </>
  );
};

export default App;
