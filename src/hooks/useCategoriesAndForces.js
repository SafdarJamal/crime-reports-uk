import { useState, useEffect } from 'react';
import { categories, forces } from '../api/UK_POLICE';

const useCategoriesAndForces = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState(null);
  const [forceOptions, setForceOptions] = useState(null);

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

  return [isLoading, categoryOptions, forceOptions];
};

export default useCategoriesAndForces;
