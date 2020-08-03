import React, { useState, useEffect, useRef } from 'react';

import Loader from '../Loader';
import Header from '../Header';
import Main from '../Main';
import DataTable from '../DataTable';

import { getCategories, getForces, getCrimeReports } from '../../api';

const App = () => {
  const date = new Date();

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [forces, setForces] = useState([]);
  const [category, setCategory] = useState('');
  const [force, setForce] = useState('');
  const [year, setYear] = useState(
    date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear()
  );
  const [month, setMonth] = useState(
    date.getMonth() === 0 ? 12 : date.getMonth()
  );
  const [categoryIsInvalid, setCategoryIsInvalid] = useState(false);
  const [forceIsInvalid, setForceIsInvalid] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  const bottomRef = useRef();

  useEffect(() => {
    Promise.all([getCategories(), getForces()])
      .then(([categories, forces]) => {
        setCategories(categories);
        setForces(forces);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
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
        .catch(error => setError(error));
    }, 1000);
  };

  const scrollBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) return <Loader />;
  if (error) return `An error has occurred: ${error.message}`;

  return (
    <>
      <Header />
      <Main
        categories={categories}
        forces={forces}
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
