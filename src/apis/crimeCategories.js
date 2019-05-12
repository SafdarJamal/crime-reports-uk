export default () => {
  const result = fetch(
    'https://data.police.uk/api/crime-categories?date=2011-08'
  )
    .then(response => response.json())
    .then(result => result);
  console.log(result);
};
