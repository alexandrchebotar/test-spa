import {createStore
//, applyMiddleware
//  , compose
} from 'redux'; 
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {appState} from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, appState);

const store = createStore(
  persistedReducer, 
  // applyMiddleware(logger, thunk)
  // composeEnhancers(applyMiddleware(thunk))
);  

const persistor = persistStore(store);

export {store, persistor};
export default store;
