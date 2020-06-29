import React, { useState, useEffect } from 'react';
import { categories, forces, crimeReports } from '../../api/UK_POLICE';

import Header from '../Header';
import Main from '../Main';
import DataTable from '../DataTable';
import Loader from '../Loader';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState(null);
  const [forceOptions, setForceOptions] = useState(null);
  const [category, setCategory] = useState('');
  const [force, setForce] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(
    new Date().getMonth() === 0 ? 1 : new Date().getMonth()
  );
  const [categoryIsInvalid, setCategoryIsInvalid] = useState(false);
  const [forceIsInvalid, setForceIsInvalid] = useState(false);
  const [fetchingReports, setFetchingReports] = useState(false);
  const [reports, setReports] = useState(null);

  useEffect(() => {
    Promise.all([categories(), forces()])
      .then(([categoryOptions, forceOptions]) => {
        setCategoryOptions(categoryOptions);
        setForceOptions(forceOptions);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  const getCrimeReports = () => {
    let categoryIsInvalid = false;
    let forceIsInvalid = false;

    if (category === '') {
      categoryIsInvalid = true;
    }
    if (force === '') {
      forceIsInvalid = true;
    }

    if (categoryIsInvalid || forceIsInvalid) {
      setCategoryIsInvalid(categoryIsInvalid);
      setForceIsInvalid(forceIsInvalid);
      return;
    }

    setCategoryIsInvalid(categoryIsInvalid);
    setForceIsInvalid(forceIsInvalid);
    setFetchingReports(true);

    setTimeout(() => {
      crimeReports(category, force, year, month)
        .then(reports => {
          setReports(reports);
          fetchingReports(false);
        })
        .catch(error =>
          console.log(`Getting Crime Reports ==> ${error.message}`)
        );
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
