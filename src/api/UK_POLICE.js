const categories = () => {
  return new Promise((resolve, reject) => {
    fetch('https://data.police.uk/api/crime-categories?date=2011-08')
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

const crimeReports = (category, force) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://data.police.uk/api/crimes-no-location?category=${category}&force=${force}`
    )
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject({ message: error }));
  });
};

export { categories, forces, crimeReports };
