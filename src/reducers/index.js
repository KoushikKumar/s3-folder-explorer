import { combineReducers } from 'redux';
import BucketDataReducer from './bucket-data-reducer';
import PopupReducer from './popup-reducer';

const rootReducer = combineReducers({
  bucketData: BucketDataReducer,
  file: PopupReducer
});

export default rootReducer;
