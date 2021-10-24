import styled from '@emotion/styled';
import { connect } from 'react-redux'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import { _saveQuestionAnswer } from '../utils/index';
import { useHistory } from 'react-router-dom';

const Card = styled.div`
  border: 1px solid #9B51E0;
  background: #9B51E030;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  align-items: flex-start;
  margin: 10px 0px; 
  box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.16);

  .avatar-wrapper {
    flex: 1.5;
    display: flex;
    justify-content: center;
    img {
      width: 75px;
      height: 75px;
      border-radius: 50px;
    }
  }
  .info-wrapper {
    flex: 4;
    display: flex;
    flex-direction: column;
    .name {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 5px;
    }

    .question {
      font-style: italic;
      div {
        margin-bottom: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
      }

      p {
        margin: 0;
        margin-bottom: 10px;
        font-weight: 700;
      }
    }
    
    button {
      border: none;
      background: #9B51E0;
      height: 35px;
      padding: 0 15px;
      border-radius: 5px;
      color: #fff;
      font-size: 16px;
      margin-top: 10px;

      :hover {
        cursor: pointer;
        background: #9B51E0dd;
      }
    }

    .question-h2 {
      font-size: 18px
    }
  }
`;

const QuestionCard = ({ user, notQuestion, authedUser, id, questions }) => {
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState('optionOne');
  const [viewQuestion, setViewQuestion] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setQuestion(questions[id])
  }, [id, questions]);

  const submitAns = async () => {
    try {
      await _saveQuestionAnswer({authedUser, qid: id, answer});
      setViewQuestion(false);
    } catch (error) {
      console.log(error);
    }
  }

  const viewAnswer = () => {
    history.push(`/results/${id}`, {
      id,
      question
    })
  }

  return (
    <Card>
      {!viewQuestion ? (
        <>
          <div className="avatar-wrapper">
            <img src={user?.avatarURL ? user.avatarURL : 'https://'} alt="avatar" />
          </div>
          <div className="info-wrapper">
            <div className="name">{user.name} asks:</div>
            <div className="question">
              <div>Would you rather?</div>
              {question.hasOwnProperty('id') && (
                <p>{question.optionOne.text.substr(0, 10)}...</p>
              )}
              <button 
                onClick={() => !notQuestion ? viewAnswer() : setViewQuestion(true)}
              >
                  See Question
                </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="avatar-wrapper">
            <img src={user.avatarURL && user.avatarURL} alt="avatar" />
          </div>
          <div className="info-wrapper">
            <div className="question-h2">
              <div>Would you rather...?</div>
            </div>
            {question.hasOwnProperty('id') && (
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  defaultValue='optionOne'
                  name="radio-buttons-group"
                  onChange={(e) => setAnswer(e.target.value)}
                >
                  <FormControlLabel value='optionOne' control={<Radio />} label={question.optionOne.text} />
                  <FormControlLabel value='optionTwo' control={<Radio />} label={question.optionTwo.text} />
                </RadioGroup>
              </FormControl>
            )}
            <button onClick={() => submitAns()}>Answer Question</button>
          </div>
        </>
      )}
    </Card>
  )
}

const mapStateToProps = ({ users, questions, authedUser }, { id }) => {
  return {
    user: users[questions[id].author],
    authedUser,
    id,
    questions
  }
}
export default connect(mapStateToProps, null)(QuestionCard);
