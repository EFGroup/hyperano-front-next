import { useMemo } from 'react'
import { createStore, configureStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from '../reducers'

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

// const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();


let store

// const initState = {
//   language: {
//     lang: "fa",
//     direction: "rtl"
//   }
// }

const persistConfig = {
  key: 'primary',
  // storage,
  storage : typeof window !== "undefined" ? storage : createNoopStorage(),
  whitelist: ['language', 'cart', 'user', 'shop'], // place to select which state you want to persist
}

const persistedReducer = persistReducer(persistConfig, reducers)

// function makeStore(initialState = initState) {
  function makeStore(initialState) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
