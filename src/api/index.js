const API_BASE = 'https://data.police.uk/api';

const getCategories = () =>
  new Promise((resolve, reject) => {
    fetch(`${API_BASE}/crime-categories`)
      .then(response => response.json())
      .then(categories => resolve(categories))
      .catch(error => reject(error));
  });

const getForces = () =>
  new Promise((resolve, reject) => {
    fetch(`${API_BASE}/forces`)
      .then(response => response.json())
      .then(forces => resolve(forces))
      .catch(error => reject(error));
  });

const getCrimeReports = (category, force, year, month) =>
  new Promise((resolve, reject) => {
    fetch(
      `${API_BASE}/crimes-no-location?category=${category}&force=${force}&date=${year}-${month}`
    )
      .then(response => response.json())
      .then(reports => resolve(reports))
      .catch(error => reject(error));
  });

export { getCategories, getForces, getCrimeReports };
