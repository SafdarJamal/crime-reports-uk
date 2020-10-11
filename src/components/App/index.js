import React, { useState, useEffect, useRef } from 'react';

import Loader from '../Loader';
import Layout from '../Layout';
import Main from '../Main';
import DataTable from '../DataTable';

import { getCategories, getForces, getCrimeReports } from '../../api';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [forces, setForces] = useState([]);
  const [category, setCategory] = useState('');
  const [force, setForce] = useState('');
  const [date, setDate] = useState(`2020-8`);
  const [categoryIsInvalid, setCategoryIsInvalid] = useState(false);
  const [forceIsInvalid, setForceIsInvalid] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [crimeReports, setCrimeReports] = useState([]);
  const [error, setError] = useState(null);

  const bottomRef = useRef();

  useEffect(() => {
    Promise.all([getCategories(), getForces()])
      .then(([categories, forces]) => {
        setCategories(categories);
        setForces(forces);
        setIsLoading(false);
      })
      .catch(error => setError(error))
      .then(() => setIsLoading(false));
  }, []);

  const handleSearch = event => {
    event.preventDefault();

    if (!category) return setCategoryIsInvalid(true);
    if (!force) return setForceIsInvalid(true);

    setCategoryIsInvalid(false);
    setForceIsInvalid(false);
    setIsFetching(true);

    setTimeout(() => {
      getCrimeReports(category, force, date)
        .then(crimeReports => setCrimeReports(crimeReports))
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
    <Layout>
      <Main
        categories={categories}
        forces={forces}
        category={category}
        force={force}
        date={date}
        setCategory={setCategory}
        setForce={setForce}
        setDate={setDate}
        handleSearch={handleSearch}
        categoryIsInvalid={categoryIsInvalid}
        forceIsInvalid={forceIsInvalid}
        setCategoryIsInvalid={setCategoryIsInvalid}
        setForceIsInvalid={setForceIsInvalid}
        isFetching={isFetching}
      />
      <DataTable
        isFetching={isFetching}
        crimeReports={crimeReports}
        bottomRef={bottomRef}
      />
    </Layout>
  );
};

export default App;
