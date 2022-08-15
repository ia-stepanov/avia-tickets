import api from '../services/apiServices';

class Locations {
  constructor(api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
  }

  async init() {
    // prettier-ignore
    const response = await Promise.all([
      this.api.countries(), 
      this.api.cities(),
    ]);

    const [countries, cities] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);

    return response;
  }

  createShortCitiesList(cities) {
    // { 'City, Country' : null}
    // Object.entries => [key, value]
    return Object.entries(cities).reduce((acc, [key]) => {
      console.log(key);
      acc[key] = null;
      return acc;
    }, {});
  }

  serializeCountries(countries) {
    // { 'Country code': { ... } }
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  serializeCities(cities) {
    // { 'City name, Country name': { ... } }
    return cities.reduce((acc, city) => {
      const citu_name = city.name || city.name_translations.en;
      const country_name = this.getCountryNameByCode(city.country_code);
      const key = `${city.name}, ${country_name}`;
      acc[key] = city;
      return acc;
    }, {});
  }

  getCountryNameByCode(code) {
    // { 'Country code': { ... } }
    return this.countries[code].name;
  }

  getCitiesByCountryCode(code) {
    return this.cities.filter((city) => city.country_code === code);
  }
}

const locations = new Locations(api);

export default locations;