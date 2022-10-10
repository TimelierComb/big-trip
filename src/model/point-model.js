import AbstractObserver from '../utils/abstract-observer';

export default class PointModel extends AbstractObserver {
  #points = [];

  set points(points) {
    this.#points = [...points];
  }

  get points() {
    return this.#points;
  }
}
