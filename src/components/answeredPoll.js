import styled from '@emotion/styled';
import { connect } from 'react-redux'

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
    .name {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .question {
      font-style: italic;
      div {
        margin-bottom: 10px;
        margin-top: 10px;
      }
      button {
        border: none;
        background: #9B51E0;
        height: 35px;
        padding: 0 15px;
        border-radius: 5px;
        color: #fff;
        font-size: 16px;
      }
    }

    .answered-wrapper {
      padding: 10px 20px;
      border-radius: 5px;
      color: #fff;
      margin-bottom: 10px;
    }

    .answered {
      display: flex;
      align-items: center;

      .asw-question {
        font-size: 18px;
        flex: 1;
      }
      .percentage {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 5px;

        span {
          font-size: 20px;
        }
      }
    }

    .notanswered-wrapper {
      padding: 10px 20px;
      border-radius: 5px;
      color: #fff;
    }
    .notanswered {
      display: flex;
      align-items: center;

      .asw-question {
        font-size: 18px;
        flex: 1;
      }
      .percentage {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 5px;
        
        span {
          font-size: 20px;
        }
      }
    }

    .your-vote {
      font-size: 14px;
      font-weight: bold;
      font-style: italic;
      text-align: left;
      margin-top: 7px;
    }
  }
`;

const AnsweredPoll = ({ authedUser, user, question }) => {

  const getPacentage = (voteCount, question) => {
    let totalQuestions = question.optionOne.votes.length + question.optionTwo.votes.length;

    return ((voteCount / totalQuestions) * 100).toFixed(2);
  }

  return (
    <Card>
      {question && (
        <>
          <div className="avatar-wrapper">
            <img src={user.avatarURL} alt="avatar" />
          </div>
          <div className="info-wrapper">
            <div className="name">Asked by {user.name}</div>
            <div className="question">
              <div>Results</div>
            </div>
            <div>
              <div
                className="answered-wrapper"
                style={question.optionOne.votes.includes(authedUser) ? { background: '#28a745' } : { background: '#9B51E0' }}
              >
                <div className='answered'>
                  <div className="asw-question">{question.optionOne.text}</div>
                  <div className="percentage">
                    <span>{getPacentage(question.optionOne.votes.length, question)}%</span>
                    {question.optionOne.votes.length} of {question.optionOne.votes.length + question.optionTwo.votes.length} votes
                  </div>
                </div>
                {question.optionOne.votes.includes(authedUser) && (
                  <div className="your-vote">
                    your vote
                  </div>
                )}
              </div>

              <div
                className="notanswered-wrapper"
                style={question.optionTwo.votes.includes(authedUser) ? { background: '#28a745' } : { background: '#9B51E0' }}
              >
                <div className='notanswered'>
                  <div className="asw-question">{question.optionTwo.text}</div>
                  <div className="percentage">
                    <span>{getPacentage(question.optionTwo.votes.length, question)}%</span>
                    {question.optionTwo.votes.length} of {question.optionOne.votes.length + question.optionTwo.votes.length} votes
                  </div>
                </div>
                {question.optionTwo.votes.includes(authedUser) && (
                  <div className="your-vote">
                    your vote
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Card>
  )
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps, null)(AnsweredPoll)