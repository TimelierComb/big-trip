import {render, RenderPosition} from '../utils/render.js';
import {updateItem, sortByDay, sortByDuration, sortByPrice} from '../utils/common.js';
import {SortTipes} from '../const.js';
import TripSortView from '../view/trip-sort.js';
import TripListView from '../view/trip-list.js';
import NoPointsView from '../view/no-points.js';
import PointPresenter from './point-presenter.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #noPointsComponent = new NoPointsView();
  #tripListComponent = new TripListView();
  #tripSortComponent = new TripSortView();

  #tripPoints = [];
  #pointPresenter = new Map();
  #currentSortType = SortTipes.DAY;
  #originPoints = [];

  constructor(tripContainer, pointsModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  get points() {
    return this.#pointsModel.points;
  }

  init = () => {
    this.#tripPoints = [...tripPoints].sort(sortByDay);
    this.#originPoints = [...tripPoints];

    this.#renderTrip();
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoints = () => {
    this.#tripPoints.forEach((tripPoint) => this.#renderPoint(tripPoint));
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
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

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderSort = () => {
    render(this.#tripContainer, this.#tripSortComponent, RenderPosition.BEFOREEND);
    this.#tripSortComponent.setChangeSortHandler(this.#handleSortType);
  };

  #handleSortType = (sortType) => {
    if ((this.#currentSortType === sortType)
      || (sortType === SortTipes.EVENT)
      || (sortType === SortTipes.OFFERS)) {
      return;
    }

    this.#sortPoints(sortType);

    this.#clearPointList();
    this.#renderPoints();
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortTipes.DAY:
        this.#tripPoints.sort(sortByDay);
        break;
      case SortTipes.PRICE:
        this.#tripPoints.sort(sortByPrice);
        break;
      case SortTipes.TIME:
        this.#tripPoints.sort(sortByDuration);
        break;
      default:
        this.#tripPoints = [...this.#originPoints];
    }

    this.#currentSortType = sortType;
  };
}
