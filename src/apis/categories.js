export default () => {
  return new Promise((resolve, reject) => {
    fetch('https://data.police.uk/api/crime-categories?date=2011-08')
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject({ message: 'something went wrong!' }));
  });
};
