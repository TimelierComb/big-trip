import AbstractView from './abstract.js';

const createNavigationContainerTemplate = () => (
  `<div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <!-- Меню -->
  </div>`
);

export default class NavigationContainerView extends AbstractView {
  get template() {
    return createNavigationContainerTemplate();
  }
}
