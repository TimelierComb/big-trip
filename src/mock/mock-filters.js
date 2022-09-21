import {isPointInFuture, isPointInPast} from '../utils/point.js';

const filterPoints =  {
  everything: (points) => points.length,
  future: (points) => points.filter((point) => isPointInFuture(point.startTime, point.endTime)).length,
  past: (points) => points.filter((point) => isPointInPast(point.startTime, point.endTime)).length,
};

export const generateFilters = (points) => Object.entries(filterPoints).map(
  ([filterName, countPoints]) => ({
    name: filterName,
    count: countPoints(points),
  })
);

