import {render, RenderPosition} from './render.js';
import EditPointView from './view/edit-point.js';
import FiltersView from './view/filters.js';
import NavigationView from './view/menu-navigation.js';
import PointView from './view/point.js';
import TripCostView from './view/trip-cost.js';
import TripInfoView from './view/trip-info.js';
import TripSortView from './view/trip-sort.js';
import TripListView from './view/trip-list.js';
import NoPointsView from './view/no-points.js';

import {generatePoint} from './mock/mock-point.js';
import {generateFilters} from './mock/mock-filters.js';


const POINTS_COUNT = 22;
const points = Array.from({length: POINTS_COUNT}, generatePoint);
const filters = generateFilters(points);

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const editPointComponent = new EditPointView(point);

  const replaceCardToForm = () => {
    pointListElement.replaceChild(editPointComponent.element, pointComponent.element);
  };

  const replaceFormToCard = () => {
    pointListElement.replaceChild(pointComponent.element, editPointComponent.element);
  };

  const onEscKeydown = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();

    document.addEventListener('keydown', onEscKeydown);
  });

  editPointComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeydown);
  });

  editPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToCard();
  });

  render(pointListElement, pointComponent.element, RenderPosition.BEFOREEND);
};

const siteBodyElement = document.querySelector('.page-body');
const tripMainElement = siteBodyElement.querySelector('.trip-main');
const eventsElement = siteBodyElement.querySelector('.trip-events');

const navigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const NavigationComponenet = new NavigationView();
render(navigationElement, NavigationComponenet.element, RenderPosition.BEFOREEND);

const filtersElement = tripMainElement.querySelector('.trip-controls__filters');

const filtersComponent = new FiltersView(filters);

render(filtersElement, filtersComponent.element, RenderPosition.BEFOREEND);

if (points.length === 0) {
  const noPointsComponent = new NoPointsView();
  render(eventsElement, noPointsComponent.element, RenderPosition.BEFOREEND);
} else {
  const tripInfoComponent = new TripInfoView(points);
  render(tripMainElement, tripInfoComponent.element, RenderPosition.AFTERBEGIN);

  render(tripInfoComponent.element, new TripCostView(points).element, RenderPosition.BEFOREEND);

  render(eventsElement, new TripSortView().element, RenderPosition.BEFOREEND);

  const tripListComponent = new TripListView();
  render(eventsElement, tripListComponent.element, RenderPosition.BEFOREEND);

  for (let i = 0; i < POINTS_COUNT; i++) {
    renderPoint(tripListComponent.element, points[i]);
  }
}
