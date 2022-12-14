import AbstractView from './abstract.js';

const createTripControlsTemplate = () => (
  '<div class="trip-main__trip-controls  trip-controls"></div>'
);

export default class TripControlsView extends AbstractView {
  get template() {
    return createTripControlsTemplate();
  }
}
