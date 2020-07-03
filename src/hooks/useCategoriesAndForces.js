import { useState, useEffect } from 'react';
import { getCategories, getForces } from '../api';

const useCategoriesAndForces = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [forceOptions, setForceOptions] = useState([]);

  useEffect(() => {
    Promise.all([getCategories(), getForces()])
      .then(([categoryOptions, forceOptions]) => {
        setCategoryOptions(categoryOptions);
        setForceOptions(forceOptions);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  return [isLoading, categoryOptions, forceOptions];
};

export default useCategoriesAndForces;
