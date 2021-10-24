import styled from '@emotion/styled';
import { connect } from 'react-redux'

const Card = styled.div`
  border: 1px solid #9B51E0;
  background: #9B51E030;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  align-items: flex-start;
  margin: 10px 0px; 
  box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.16);
  height: 120px;

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
        margin-top: 20px;
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
  }
`;

const AnswerCard = ({id}) => {
  return (
    <Card>
      <div className="avatar-wrapper">
            {/* <img src={user.avatarURL} alt="avatar" /> */}
          </div>
          <div className="info-wrapper">
            {/* <div className="name">{user.name} asks:</div> */}
            <div className="question">
              <div>Would you rather?</div>
              <button>See Question</button>
            </div>
          </div>
    </Card>
  )
}

const mapStateToProps = ({authedUser}) => {

}

export default connect(mapStateToProps, null)(AnswerCard);