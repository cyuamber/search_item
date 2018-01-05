import { applyMiddleware, createStore, compose } from 'redux';
import { resourceMiddleware } from 'redux-resource-wlfe';
import sequenceAction from 'redux-sequence-action-wlfe';
import xhr from '../middleware/xhr';
export default function storeFactory(initialState) {
  return (rootReducer, rootSaga) => {
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(sequenceAction),
        applyMiddleware(resourceMiddleware),
        applyMiddleware(xhr),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    return store;
  };
}
