const categories = () => {
  return new Promise((resolve, reject) => {
    fetch('https://data.police.uk/api/crime-categories')
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject({ message: error }));
  });
};

const forces = () => {
  return new Promise((resolve, reject) => {
    fetch('https://data.police.uk/api/forces')
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject({ message: error }));
  });
};

const crimeReports = (category, force, year, month) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://data.police.uk/api/crimes-no-location?category=${category}&force=${force}&date=${year}-${month}`
    )
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject({ message: error }));
  });
};

export { categories, forces, crimeReports };
