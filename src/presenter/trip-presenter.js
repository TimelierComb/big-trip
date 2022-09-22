import {render, RenderPosition} from '../utils/render.js';
import TripSortView from '../view/trip-sort.js';
import TripListView from '../view/trip-list.js';
import NoPointsView from '../view/no-points.js';
import PointPresenter from './point-presenter.js';

export default class TripPresenter {
  #tripContainer = null;

  #noPointsComponent = new NoPointsView();
  #tripListComponent = new TripListView();
  #tripSortComponent = new TripSortView();

  #tripPoints = [];

  constructor(tripContainer) {
    this.#tripContainer = tripContainer;
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];

    this.#renderTrip();
  };

  #renderPoints = () => {
    this.#tripPoints.forEach((tripPoint) => this.#renderPoint(tripPoint));
  };

  #renderPoint = (point) => {
    const pointComponent = new PointPresenter(this.#tripListComponent);
    pointComponent.init(point);
  };

  #renderSort = () => {
    render(this.#tripContainer, this.#tripSortComponent, RenderPosition.BEFOREEND);
  };

  #renderTripList = () => {
    render(this.#tripContainer, this.#tripListComponent, RenderPosition.BEFOREEND);
  };

  #renderNoPoints = () => {
    render(this.#tripContainer, this.#noPointsComponent, RenderPosition.BEFOREEND);
  };

  #renderTrip = () => {
    if (this.#tripPoints.length === 0) {
      this.#renderNoPoints();

      return;
    }

    this.#renderSort();
    this.#renderTripList();
    this.#renderPoints();
  };
}
