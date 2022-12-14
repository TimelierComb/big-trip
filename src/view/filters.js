import AbstractView from '../view/abstract.js';

const createFilterTemplate = (filter) => (
  `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${filter === 'everything'? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>`
);

const createFiltersTemplate = (filters) => (
  `<div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      ${filters.map(({name}) => createFilterTemplate(name) ).join('')}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>`
);

export default class FiltersView extends AbstractView {
  #datas = null;

  constructor(datas) {
    super();

    this.#datas = datas;
  }

  get template() {
    return createFiltersTemplate(this.#datas);
  }
}
