import AbstractView from '../view/abstract.js';

const createTripListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripListView extends AbstractView {
  get template() {
    return createTripListTemplate();
  }
}
