import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import {
  renderCountriesList,
  redrerCountryFinded,
  clearCountryList,
  clearCountryFinded,
  showLoader,
  hideLoader,
} from './js/rendersFunctions';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('[id="search-box"]');

let name;

input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
  name = e.target.value.trim();

  if (name.length === 0) {
    clearCountryList();
    clearCountryFinded();
  } else {
    clearCountryFinded();

    showLoader();

    fetchCountries(name)
      .then(countries => {
        if (countries.length > 10) {
          clearCountryList();
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }

        if (countries.length > 1) {
          renderCountriesList(countries);
          return;
        }

        if (countries.length === 1) {
          redrerCountryFinded(countries);
          return;
        }
      })
      .finally(() => {
        hideLoader();
      });
  }
}
