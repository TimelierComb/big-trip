import {render, RenderPosition} from './render.js';
import EditPointView from './view/edit-point.js';
import FiltersView from './view/filters.js';
import NavigationView from './view/navigation.js';
import PointView from './view/point.js';
import TripInfoView from './view/trip-info.js';
import InfoCostView from './view/info-cost.js';
import InfoMainView from './view/info-main.js';
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

  pointComponent.setEditClickHangler(() => {
    replaceCardToForm();

    document.addEventListener('keydown', onEscKeydown);
  });

  editPointComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeydown);
  });

  editPointComponent.setCloseHandler(() => {
    replaceFormToCard();
  });

  render(pointListElement, pointComponent.element, RenderPosition.BEFOREEND);
};

const siteBodyElement = document.querySelector('.page-body');
const tripMainElement = siteBodyElement.querySelector('.trip-main');
const eventsElement = siteBodyElement.querySelector('.trip-events');
const navigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');

const boardRender = (infoContainer, eventsContainer, boardPoints) => {
  if (boardPoints.length === 0) {
    const noPointsComponent = new NoPointsView();
    render(eventsContainer, noPointsComponent.element, RenderPosition.BEFOREEND);

    return;
  }

  const tripInfoComponent = new TripInfoView();
  render(infoContainer, tripInfoComponent.element, RenderPosition.AFTERBEGIN);

  render(tripInfoComponent.element, new InfoMainView(points).element, RenderPosition.AFTERBEGIN);
  render(tripInfoComponent.element, new InfoCostView(points).element, RenderPosition.BEFOREEND);

  render(eventsContainer, new TripSortView().element, RenderPosition.BEFOREEND);

  const tripListComponent = new TripListView();
  render(eventsContainer, tripListComponent.element, RenderPosition.BEFOREEND);

  for (let i = 0; i < boardPoints.length; i++) {
    renderPoint(tripListComponent.element, boardPoints[i]);
  }
};

render(navigationElement, new NavigationView().element, RenderPosition.BEFOREEND);
render(filtersElement, new FiltersView(filters).element, RenderPosition.BEFOREEND);

boardRender(tripMainElement, eventsElement, points);
