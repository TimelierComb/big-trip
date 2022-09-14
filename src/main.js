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

render(tripListComponent.element, new EditPointView(points[0]).element, RenderPosition.BEFOREEND);

for (let i = 1; i < POINTS_COUNT; i++) {
  render(tripListComponent.element, new PointView(points[i]).element, RenderPosition.BEFOREEND);
}
