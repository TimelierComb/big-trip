import AbstractView from './abstract.js';

const createFiltersContainerTemplate = () => (
  `<div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <!-- Фильтры -->
  </div>`
);

export default class FiltersContainerView extends AbstractView {
  get template() {
    return createFiltersContainerTemplate();
  }
}
