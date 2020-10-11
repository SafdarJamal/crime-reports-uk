const API_BASE = 'https://data.police.uk/api';

const getCategories = () => {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE}/crime-categories`)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};

const getForces = () => {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE}/forces`)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};

const getCrimeReports = (category, force, date) => {
  return new Promise((resolve, reject) => {
    fetch(
      `${API_BASE}/crimes-no-location?category=${category}&force=${force}&date=${date}`
    )
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};

export { getCategories, getForces, getCrimeReports };
