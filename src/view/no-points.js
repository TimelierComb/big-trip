import AbstractView from '../view/abstract.js';

const noPointsTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class NoPointsView extends AbstractView {
  get template() {
    return noPointsTemplate();
  }
}
