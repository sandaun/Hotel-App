import {FilterTypes} from '../types/types';

export const FILTER_ICONS: {[key in FilterTypes]?: string} = {
  [FilterTypes.Stars]: '🌟',
  [FilterTypes.Price]: '💰',
  [FilterTypes.Score]: '🤩',
  [FilterTypes.None]: '🚫',
};
