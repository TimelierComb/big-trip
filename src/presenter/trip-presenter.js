import {remove, render, RenderPosition} from '../utils/render.js';
import {sortByDay, sortByDuration, sortByPrice} from '../utils/common.js';
import {SortTipes, UserAction, UpdateType} from '../const.js';
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

  #pointPresenter = new Map();
  #currentSortType = SortTipes.DAY;

  constructor(tripContainer, pointsModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortTipes.DAY:
        return  [...this.#pointsModel.points].sort(sortByDay);
      case SortTipes.PRICE:
        return  [...this.#pointsModel.points].sort(sortByPrice);
      case SortTipes.TIME:
        return  [...this.#pointsModel.points].sort(sortByDuration);
    }

    return this.#pointsModel.points;
  }

  init = () => {
    this.#renderBoard();
  };

  #renderPoints = () => {
    this.points.forEach((tripPoint) => this.#renderPoint(tripPoint));
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderTripList = () => {
    render(this.#tripContainer, this.#tripListComponent, RenderPosition.BEFOREEND);
  };

  #renderNoPoints = () => {
    render(this.#tripContainer, this.#noPointsComponent, RenderPosition.BEFOREEND);
  };

  #renderBoard = () => {
    if (this.points.length === 0) {
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

    this.#currentSortType = sortType;

    this.#clearPointList();
    this.#renderBoard();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointList();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#clearPointList();

    remove(this.#tripSortComponent);
    remove(this.#noPointsComponent);

    if (resetSortType) {
      this.#currentSortType = SortTipes.DAY;
    }
  };
}
