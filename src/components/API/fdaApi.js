const BASE_URL = "https://api.fda.gov/drug/label.json";

export const fetchDrug = async (query) => {
  //  search by generic name
  let url = `${BASE_URL}?search=openfda.generic_name:${query}&limit=1`;
  let response = await fetch(url);
  let data = await response.json();
  if (Array.isArray(data.results)) return data.results[0];

  //  search by brand name
  url = `${BASE_URL}?search=openfda.generic_name:${query}&limit=1`;
  response = await fetch(url);
  data = await response.json();
  return Array.isArray(data.results) ? data.results[0] : null;
};
