import {render, RenderPosition} from './utils.js';
import EditPointView from './view/edit-point.js';
import FiltersView from './view/filters.js';
import NavigationView from './view/menu-navigation.js';
import PointView from './view/point.js';
import TripCostView from './view/trip-cost.js';
import TripInfoView from './view/trip-info.js';
import TripSortView from './view/trip-sort.js';
import TripListView from './view/trip-list.js';

import {generatePoint} from './mock/mock-point.js';


const POINTS_COUNT = 20;
const points = Array.from({length: POINTS_COUNT}, generatePoint);

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const editPointComponent = new EditPointView(point);

  const replaceCardToForm = () => {
    pointListElement.replaceChild(editPointComponent.element, pointComponent.element);
  };

  const replaceFormToCard = () => {
    pointListElement.replaceChild(pointComponent.element, editPointComponent.element);
  };

  pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
  });

  editPointComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(pointListElement, pointComponent.element, RenderPosition.BEFOREEND);
};

const siteBodyElement = document.querySelector('.page-body');
const tripMainElement = siteBodyElement.querySelector('.trip-main');

const tripInfoComponent = new TripInfoView(points);
render(tripMainElement, tripInfoComponent.element, RenderPosition.AFTERBEGIN);

render(tripInfoComponent.element, new TripCostView(points).element, RenderPosition.BEFOREEND);

const navigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const NavigationComponenet = new NavigationView();
render(navigationElement, NavigationComponenet.element, RenderPosition.BEFOREEND);

const filtersElement = tripMainElement.querySelector('.trip-controls__filters');

render(filtersElement, new FiltersView().element, RenderPosition.BEFOREEND);

const eventsElement = siteBodyElement.querySelector('.trip-events');
render(eventsElement, new TripSortView().element, RenderPosition.BEFOREEND);

const tripListComponent = new TripListView();
render(eventsElement, tripListComponent.element, RenderPosition.BEFOREEND);

for (let i = 1; i < POINTS_COUNT; i++) {
  renderPoint(tripListComponent.element, points[i]);
}
