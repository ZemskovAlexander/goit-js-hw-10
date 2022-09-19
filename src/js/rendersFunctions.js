const countryList = document.querySelector('.country-list');
const oneCountryInfo = document.querySelector('.country-info');
const loader = document.querySelector('.loader');

export function renderCountriesList(countries) {
  const markup = countries
    .map(country => {
      const countryName = country.name.official;

      return `<li>
                <span
                  ><img
                    src="${country.flags.svg} "
                    alt="${countryName} flag"
                    width="36px"
                    height="25px"
                /></span>
                ${countryName}
              </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

export function redrerCountryFinded(countries) {
  clearCountryList();
  const countryName = countries[0].name.official;
  const flagUrl = countries[0].flags.svg;
  const capital = countries[0].capital[0];
  const population = countries[0].population;
  const languages = Object.values(countries[0].languages).join(', ');

  oneCountryInfo.innerHTML = `<div class="country-name">
          <img
            src="${flagUrl} "
            alt="${countryName} flag"
            width="36px"
            height="25px"
          />
          <h2>${countryName}</h2>
        </div>
        <ul class="country-desc">
          <li><span>Capital: </span>${capital}</li>
          <li><span>Population: </span>${population}</li>
          <li><span>Languages: </span>${languages}</li>
        </ul>`;
}

export function clearCountryList() {
  countryList.innerHTML = '';
}

export function clearCountryFinded() {
  oneCountryInfo.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('show');
}
export function hideLoader() {
  loader.classList.remove('show');
}
