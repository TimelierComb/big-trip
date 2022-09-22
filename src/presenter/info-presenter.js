import {render, RenderPosition} from '../utils/render.js';
import FiltersView from '../view/filters.js';
import NavigationView from '../view/navigation.js';
import TripInfoView from '../view/trip-info.js';
import InfoCostView from '../view/info-cost.js';
import InfoMainView from '../view/info-main.js';
import TripControlsView from '../view/trip-controls.js';
import FiltersContainerView from '../view/controls-filters.js';
import NavigationContainerView from '../view/controls-navigation.js';

export default class InfoPresenter {
  #tripPoints = [];
  #filters = [];
  #infoContainer = null;

  #filtersComponent = null;
  #navigationComponent = new NavigationView();
  #tripInfoComponent = new TripInfoView();
  #infoCostComponenet = null;
  #infoMainComponent = null;
  #controlsComponent = new TripControlsView();
  #filtersContainerComponenet = new FiltersContainerView();
  #navigationContainerComponent = new NavigationContainerView();

  constructor(infoContainer) {
    this.#infoContainer = infoContainer;
  }

  init = (tripPoints, filters) => {
    this.#tripPoints = [...tripPoints];
    this.#filters = [...filters];

    this.#renderInfo();
  };

  #renderFilters = () => {
    this.#filtersComponent = new FiltersView(this.#filters);
    render(this.#filtersContainerComponenet, this.#filtersComponent, RenderPosition.BEFOREEND);
  };

  #renderNavigation = () => {
    render(this.#navigationContainerComponent, this.#navigationComponent, RenderPosition.BEFOREEND);
  };

  #renderTripInfo = () => {
    render(this.#infoContainer, this.#tripInfoComponent, RenderPosition.AFTERBEGIN);
  };

  #renderInfoCost = () => {
    this.#infoCostComponenet = new InfoCostView(this.#tripPoints);
    render(this.#tripInfoComponent, this.#infoCostComponenet, RenderPosition.BEFOREEND);
  };

  #renderInfoMain = () => {
    this.#infoMainComponent = new InfoMainView(this.#tripPoints);
    render(this.#tripInfoComponent, this.#infoMainComponent, RenderPosition.AFTERBEGIN);
  };

  #renderInfo = () => {
    this.#renderNavigation();
    this.#renderFilters();

    if (this.#tripPoints.length !== 0) {
      this.#renderControls();
      this.#renderNavigationContainer();
      this.#renderFiltersContainer();
      this.#renderTripInfo();
      this.#renderInfoMain();
      this.#renderInfoCost();
    }
  };

  #renderControls = () => {
    render(this.#infoContainer, this.#controlsComponent, RenderPosition.AFTERBEGIN);
  };

  #renderFiltersContainer = () => {
    render(this.#controlsComponent, this.#filtersContainerComponenet, RenderPosition.BEFOREEND);
  };

  #renderNavigationContainer = () => {
    render(this.#controlsComponent, this.#navigationContainerComponent, RenderPosition.BEFOREEND);
  };
}
