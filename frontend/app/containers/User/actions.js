/*
 *
 * User actions
 *
 */

import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  SAVE_ERROR,
  UPDATE
} from './constants';
import { fetchUser, updateUser } from '../../api';

export function getRequest() {
  return {
    type: GET_REQUEST
  };
}

export function getSuccess(user) {
  return {
    type: GET_SUCCESS,
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone || '',
      position: user.position || '',
      master: user.master || '',
      allergies: user.allergies || '',
      type: user.type_of_user
    }
  };
}

export function getError() {
  return {
    type: GET_ERROR
  };
}

export const getUser = () => dispatch => {
  dispatch(getRequest());
  fetchUser()
    .then(data => dispatch(getSuccess(data.user)))
    .catch(error => dispatch(getError()));
}

export function update(user) {
  return {
    type: UPDATE,
    user
  };
}

export function saveRequest() {
  return {
    type: SAVE_REQUEST
  };
}

export function saveSuccess() {
  return {
    type: SAVE_SUCCESS
  };
}

export function saveError() {
  return {
    type: SAVE_ERROR
  };
}

export const save = () => (dispatch, getState) => {
  const { user } = getState().get('user').toJS();
  const data = {
    first_name: user.firstName,
    last_name: user.lastName,
    phone: user.phone,
    position: user.position,
    master: user.master
  };
  console.log(data);
  dispatch(saveRequest());
  updateUser(user.id, data)
    .then(data => dispatch(saveSuccess()))
    .catch(error => dispatch(saveError()))
}
