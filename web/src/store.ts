import { createStore, compose, applyMiddleware } from 'redux';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
// 'routerMiddleware': the new way of storing route changes with redux middleware since rrV4.
import createRootReducer, { RootState } from './reducers';
import { persistStore } from 'redux-persist';

const persistedReducer = createRootReducer();

function configureStoreProd(initialState?: any) {
  const middlewares = [
    // Add other middleware on this line...

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunk,
  ];

  const store = createStore(
    persistedReducer, // root reducer with router state
    initialState,
    compose(applyMiddleware(...middlewares)),
  );
  return { store, persistor: persistStore(store) };
}

function configureStoreDev(initialState?: any) {
  const middlewares = [
    // Add other middleware on this line...

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    // reduxImmutableStateInvariant(),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunk,
  ];

  // @ts-ignore
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(
    persistedReducer, // root reducer with router state
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  // @ts-ignore
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // @ts-ignore
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return { store, persistor: persistStore(store) };
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
