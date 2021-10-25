import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { _saveQuestionAnswer } from '../utils/index';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const Card = styled.div`
  width: 480px;
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
      margin-bottom: 10px;
    }

    .question {
      font-size: 18px
      div {
        margin-bottom: 10px;
        margin-top: 10px;
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
  }
`;

const Answer = ({ authedUser, users }) => {
  const [_user, setUser] = useState({});
  const [answer, setAnswer] = useState('optionOne');

  const history = useHistory();
  const { question } = history.location.state

  useEffect(() => {
    setUser(users[question.author])
  }, [question.author, users])

  const submitAns = async () => {
    try {
      await _saveQuestionAnswer({ authedUser, qid: question.id, answer });
      history.push('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      <div className="avatar-wrapper">
        <img src={_user.avatarURL && _user.avatarURL} alt="avatar" />
      </div>
      <div className="info-wrapper">
      <div className="name">{_user.name} asks:</div>
        <div className="question">
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
    </Card>
  )
}

const mapStateToProps = ({ users, authedUser }) => {
  return {
    users,
    authedUser
  }
}

export default connect(mapStateToProps, null)(Answer);
