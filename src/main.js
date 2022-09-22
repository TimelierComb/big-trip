import InfoPresenter from './presenter/info-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';

import {generatePoint} from './mock/mock-point.js';
import {generateFilters} from './mock/mock-filters.js';


const POINTS_COUNT = 22;
const points = Array.from({length: POINTS_COUNT}, generatePoint);
const filters = generateFilters(points);

const siteBodyElement = document.querySelector('.page-body');
const tripMainElement = siteBodyElement.querySelector('.trip-main');
const eventsElement = siteBodyElement.querySelector('.trip-events');

const infoComponent = new InfoPresenter(tripMainElement);
const tripComponent = new TripPresenter(eventsElement);

infoComponent.init(points, filters);
tripComponent.init(points);
