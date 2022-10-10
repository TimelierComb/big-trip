import InfoPresenter from './presenter/info-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';

import {generatePoint} from './mock/mock-point.js';
import {generateFilters} from './mock/mock-filters.js';
import {sortByDay} from './utils/common.js';
import PointModel from './model/point-model.js';


const POINTS_COUNT = 22;
const points = Array.from({length: POINTS_COUNT}, generatePoint).sort(sortByDay);
const filters = generateFilters(points);

const pointsModel = new PointModel;
pointsModel.points = points;

const siteBodyElement = document.querySelector('.page-body');
const tripMainElement = siteBodyElement.querySelector('.trip-main');
const eventsElement = siteBodyElement.querySelector('.trip-events');

const infoComponent = new InfoPresenter(tripMainElement);
const tripComponent = new TripPresenter(eventsElement, pointsModel);

infoComponent.init(points, filters);
tripComponent.init(points);
