import { _getQuestions, _getUsers } from '../../utils/';
import { recieveUsers } from './users';
import { recieveQuestions } from './questions';
import { showLoading, hideLoading } from 'react-redux-loading'

export function getData() {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const users = await _getUsers();
      const questions = await _getQuestions();

      dispatch(recieveUsers(users))
      dispatch(recieveQuestions(questions));
      dispatch(hideLoading())
    } catch (error) {
      console.log(error);
    }
  }
}