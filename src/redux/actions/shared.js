import { _getQuestions, _getUsers } from '../../utils/';
import { recieveUsers } from './users';
import { recieveQuestions } from './questions';
// import { setAuthedUser } from './authedUser';

export function getInitialData() {
  return async (dispatch, state) => {

    try {
      const users = await _getUsers();
      const questions = await _getQuestions();

      dispatch(recieveUsers(users))
      dispatch(recieveQuestions(questions));
      // TO DO ADD AUTHENTICATED USER TO STATE;
    } catch (error) {
      console.log(error);
    }
  }
}