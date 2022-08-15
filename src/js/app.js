import api from './services/apiServices';

api.countries().then((res) => console.log(res));
api.cities().then((res) => console.log(res));
