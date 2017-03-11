/*
 *
 * Events reducer
 *
 */ import { fromJS, Map } from 'immutable'; import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  SAVE_ERROR,
  UPDATE,
  GET_COMPANIES,
  CREATE_SUCCESS,
  GET_MISSING_FORMS,
  REMINDED_BEFORE,
  REMINDED_AFTER,
} from './constants';

const newEvent = {
  company: '',
  contact: '',
  date: '',
  location: '',
  description: '',
  beforeSurvey: '',
  afterSurvey: '',
  beforeSurveyId: '',
  afterSurveyId: '',
};

const initialState = fromJS({
  items: [],
  companies: [],
  newEvent: newEvent,
  saved: true,
});

function eventsReducer(state = initialState, action) {
  let index;
  switch (action.type) {
    case GET_SUCCESS:
      return state.merge(Map({
        items: fromJS(action.data),
        saved: true,
      }));
    case UPDATE:
      let s;
      if(action.id) {
        index = state.get('items').findIndex(event => event.get('id') === action.id);
        s = state.mergeIn(['items', index], Map(action.data));
      } else {
        s = state.mergeIn(['newEvent'], Map(action.data));
      }
      return s.merge(Map({saved: false}));
    case GET_COMPANIES:
      return state.set('companies', fromJS(action.data));
    case CREATE_SUCCESS:
      const st = state.update('items', items => items.push(fromJS(action.data)));
      return st.set('newEvent', fromJS(newEvent));
    case GET_MISSING_FORMS:
      index = state.get('items').findIndex(event => event.get('id') === action.id);
      return state.updateIn(['items', index], event => event.merge(fromJS(action.data)));
    case REMINDED_BEFORE:
      index = state.get('items').findIndex(event => event.get('id') === action.id);
      return state.setIn(['items', index, 'remindedBefore'], true);
    case REMINDED_AFTER:
      index = state.get('items').findIndex(event => event.get('id') === action.id);
      return state.setIn(['items', index, 'remindedAfter'], true);
    default:
      return state;
  }
}

export default eventsReducer;
