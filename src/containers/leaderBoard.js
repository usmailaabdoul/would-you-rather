import styled from '@emotion/styled';
import { connect } from 'react-redux'

const Card = styled.div`
  width: 520px;
  border: 1px solid #9B51E0;
  background: #9B51E030;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  align-items: center;
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

    .stats {
      font-size: 16px;
      div {
        padding: 5px 0px;
      }
    }
  }

  .total {
    background: #28a745;
    padding: 20px 10px;
    border-radius: 5px;
    color: #fff;
    font-size: 18px;

    .score {
      font-size: 22px;
      font-weight: 700;
      margin-top: 10px;
      text-align: center;
    }
  }
`;

const LeaderBoard = ({ userIDs, users }) => {
  return (
    <>
      {userIDs.map(id => (
        <Card key={id}>
          <div className="avatar-wrapper">
            <img src={users[id].avatarURL ? users[id].avatarURL : 'https://'} alt="avatar" />
          </div>
          <div className="info-wrapper">
            <div className="name">{users[id].name}</div>
            <div className="stats">
              <div>Answered questions: {users[id].questions.length}</div>
              <div>Asked questions: {Object.keys(users[id].answers).length}</div>
            </div>
          </div>
          <div className="total">
            <div>Total Score</div>
            <div className="score">{users[id].questions.length + Object.keys(users[id].answers).length}</div>
          </div>
        </Card>
      ))}
    </>
  )
}

const mapStateToProps = ({ users }) => {

  return {
    userIDs: Object.keys(users).sort((a, b) => (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length)),
    users
  }
}

export default connect(mapStateToProps, null)(LeaderBoard);
