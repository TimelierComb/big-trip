import AbstractView from '../view/abstract.js';

const tripInfoTemplate = () => (
  '<section class="trip-main__trip-info  trip-info"></section>'
);

export default class TripInfoView extends AbstractView {
  get template() {
    return tripInfoTemplate();
  }
}
