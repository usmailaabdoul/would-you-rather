import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from '@emotion/styled';

import { QuestionCard } from '../components';

const StyledButtonGroup = styled(ButtonGroup)`
  && {
      .MuiButton-contained {
        background: #9B51E0;
      }
      .MuiButton-outlined {
        border-color: #9B51E0;
        color: #9B51E0;
      }
  }
`
const CardWrapper = styled.div`
  margin-top: 20px;
`;

const Home = ({ answered, unAnswered}) => {
  const [_answered, setAnswered] = useState(answered);
  const [_unAnswered, setUnAnswered] = useState(unAnswered);
  const [view, setView] = useState('unAnswered');

  useEffect(() => {
    setAnswered(answered);
    setUnAnswered( unAnswered);
  }, [answered, unAnswered]);
  
  return (
    <div>
      <StyledButtonGroup size="large" aria-label="large button group">
        <Button
          variant={view === 'unAnswered' ? "contained" : "outlined"}
          onClick={() => setView('unAnswered')}
        >
          Unanswered Questions</Button>
        <Button
          variant={view === 'answered' ? "contained" : "outlined"}
          onClick={() => setView('answered')}
        >
          Answered Questions</Button>
      </StyledButtonGroup>

      {view === 'unAnswered' ? (
        <CardWrapper>
          {_unAnswered && _unAnswered.map(id => (
            <QuestionCard
              key={id}
              id={id}
              answered={false}
            />
          ))}
        </CardWrapper>
      ) : (
        <CardWrapper>
          {_answered && _answered.map(id => (
            <QuestionCard
              key={id}
              id={id}
              answered={true}
            />
          ))}
        </CardWrapper>
      )}
    </div>
  )
}

const mapStateToProps = ({ questions, authedUser }) => {
  const id = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  return {
    unAnswered: id.filter((q) => !questions[q].optionOne.votes.includes(authedUser) && !questions[q].optionTwo.votes.includes(authedUser)),
    answered: id.filter((q) => questions[q].optionOne.votes.includes(authedUser) || questions[q].optionTwo.votes.includes(authedUser))
  }
}

export default connect(mapStateToProps, null)(Home)
