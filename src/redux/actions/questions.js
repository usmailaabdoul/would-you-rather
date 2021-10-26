export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const NEW_QUESTION = 'NEW_QUESTION';
export const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS';

export function recieveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function newQuestion (question) {
  return {
    type: NEW_QUESTION,
    question,
  }
}
