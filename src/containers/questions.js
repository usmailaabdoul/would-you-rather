import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import { AnsweredPoll, UnAnsweredPoll } from '../components';
import { logoutUser } from '../redux/actions/authedUser';

const Questions = ({ users, questions, hasAnswered, logoutUser }) => {
  const [_user, setUser] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answered, setAnswered] = useState(null);

  const history = useHistory();

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!questions[id]) {
      logoutUser()
      return history.push('/notfound')
    }

    setAnswered(hasAnswered.includes(id))
    setUser(users[questions[id].author])
    setQuestion(questions[id])
  }, [history, id, questions, users, hasAnswered, logoutUser])

  return (
    <div>
      {question && _user &&  (
        answered ? (
          <AnsweredPoll
            user={_user}
            question={question}
          />
        ) : (
          <UnAnsweredPoll
            user={_user}
            question={question}
          />
        )
      )}
    </div>
  )
}

const mapStateToProps = ({ users, authedUser, questions }) => {
  const id = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp)

  return {
    users,
    authedUser,
    questions,
    hasAnswered: id.filter((q) => questions[q].optionOne.votes.includes(authedUser) || questions[q].optionTwo.votes.includes(authedUser))
  }
}

export default connect(mapStateToProps, {logoutUser})(Questions);
