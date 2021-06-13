import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {historyReducer} from './HistorySlice';

const rootReducer = combineReducers({
  history: historyReducer,
});

export default configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
