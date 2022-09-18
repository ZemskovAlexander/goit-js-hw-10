import './css/styles.css';
import axios from 'axios';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

axios.defaults.baseURL = `https://restcountries.com/v3.1/name/`;

const refs = {
  form: document.querySelector('.search-input'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

let items = [];
let query = '';

const fetchData = () => {
  isLoading = true;
  loaderOn();

  axios
    .get(`${query}`)
    .then(({ data }) => {
      items = [...items, data.hits];
      totalPages = data.nbPages;
      renderList(data.hits);
      // renderButtons();
    })
    .catch(error => console.log(error.message))
    .finally(() => {
      loaderOff();
      isLoading = false;
    });
};

const handleSubmit = e => {
  e.preventDefault();

  if (query === e.target.elements.query.value) return;

  query = e.target.elements.query.value;
  refs.list.innerHTML = '';
  currentPage = 0;
  items = [];

  if (!query) return;

  fetchData();
};

const render = () => {
  console.log(items);
};

// const tapCuntry = _.debounce(onSearch, 300);

refs.form.addEventListener('input', handleSubmit);

// function onSearch(evt) {
//   evt.preventDefault();

//   searchQuery = evt.target.elements.query.value;

//   fetch(`https://restcountries.com/v3.1/name/${searchQuery}`)
//     .then(r => r.json())
//     .then(console.log);
// }
