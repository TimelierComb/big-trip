import {createNewPointTemplate} from './view/edit-point.js';
import {createFiltersTemplate} from './view/filters.js';
import {createMenuNavigationTemplate} from './view/menu-navigation.js';
import {createPointTeplate} from './view/point.js';
import {createTripCostTemplate} from './view/trip-cost.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripSortTemplate} from './view/trip-sort.js';

import {generatePoint} from './mock/mock-point.js';


const POINTS_COUNT = 20;
const points = Array.from({length: POINTS_COUNT}, generatePoint);
console.log(points);

const siteBodyElement = document.querySelector('.page-body');

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = siteBodyElement.querySelector('.trip-main');
render(tripMainElement, createTripInfoTemplate(points.slice(1, points.length)), 'afterbegin');

const tripInfoElement = tripMainElement.querySelector('.trip-info');
render(tripInfoElement, createTripCostTemplate(points));

const navigationElement = tripMainElement.querySelector('.trip-controls__navigation');
render(navigationElement, createMenuNavigationTemplate());

const filtersElement = tripMainElement.querySelector('.trip-controls__filters');
render(filtersElement, createFiltersTemplate());

const eventsElement = siteBodyElement.querySelector('.trip-events');
render(eventsElement, createTripSortTemplate());

const eventListElement = eventsElement.querySelector('.trip-events__list');

render(eventListElement, createNewPointTemplate(points[0]));

for (let i = 1; i < POINTS_COUNT; i++) {
  render(eventListElement, createPointTeplate(points[i]));
}
