export default (category, force) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://data.police.uk/api/crimes-no-location?category=${category}&force=${force}`
    )
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject({ message: 'something went wrong!' }));
  });
};
