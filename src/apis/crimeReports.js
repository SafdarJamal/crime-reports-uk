export default () => {
  return new Promise((resolve, reject) => {
    fetch(
      'https://data.police.uk/api/crimes-no-location?category=all-crime&force=leicestershire'
    )
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject({ message: 'something went wrong!' }));
  });
};
