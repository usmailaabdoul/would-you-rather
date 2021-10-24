import styled from '@emotion/styled';
import { connect } from 'react-redux'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { _saveQuestion } from '../utils';
import { useHistory } from 'react-router-dom';

const Card = styled.div`
  width: 480px;
  border: 1px solid #9B51E0;
  background: #9B51E030;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0px; 
  box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.16);

  h2 {
    text-align: center;
    width: 100%;
  }

  .question-container {
    width: 100%;
    height: 100%;
    border-top: 1px solid #9B51E0;
  }

  button {
    width: 100%;
    border: none;
    background: #9B51E0;
    height: 40px;
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
`;

const NewQuestion = ({ authedUser }) => {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [optionOneError, setoptionOneError] = useState(false);
  const [optionTwoError, setOptionTwoError] = useState(false);

  const history = useHistory();

  const createQnt = async () => {
    if (optionOne.length === 0) {
      setoptionOneError(true);
      return
    }
    if (optionOne.length === 0 ) {
      setOptionTwoError(true);
      return
    }
    try {
      let question = {
        author: authedUser,
        optionOneText: optionOne,
        optionTwoText: optionTwo,
      }
      await _saveQuestion(question);
      history.push('/');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card>
      <h2>Create a New Question</h2>

      <div className="question-container">
        <h5>Answer all the questions below</h5>
        <h4>Would you rather ...</h4>

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '80%' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Enter optionOne here"
            variant="outlined"
            onChange={(e) => setOptionOne(e.target.value)}
            error={optionOneError}
            helperText={optionOneError ? "Incorrect option." : ""}
          />
          <Typography variant="h7" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            OR
          </Typography>
          <TextField
            id="outlined-basic"
            label="Enter optionTwo here"
            variant="outlined"
            error={optionTwoError}
            helperText={optionTwoError ? "Incorrect option." : ''}
            onChange={(e) => setOptionTwo(e.target.value)}
          />
        </Box>

        <button onClick={() => createQnt()}>Submit</button>
      </div>
    </Card>
  )
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  }
}

export default connect(mapStateToProps, null)(NewQuestion);