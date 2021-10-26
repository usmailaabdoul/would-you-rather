import { useState } from 'react'
import { setAuthedUser } from '../redux/actions/authedUser';
import { connect } from 'react-redux'
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Avatar from '../assets/avatar.png';
import { useHistory } from 'react-router';

const Card = styled.div`
  width: 520px;
  border: 1px solid #9B51E0;
  background: #9B51E030;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: 10px 0px; 
  box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.16);

  .heading {
    font-size: 30px;
    font-weight: bold;
    margin: 10px 0px 0px 10px;
  }
  .avatar-wrapper {
    display: flex;
    justify-content: center;
    flex: 1;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50px;
    }
  }

  button {
    border: none;
    background: #9B51E0;
    height: 40px;
    padding: 0 15px;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    margin: 10px 15px;

    :hover {
      cursor: pointer;
      background: #9B51E0dd;
    }
  }
`;


const Login = ({ users, setAuthedUser }) => {
  const [user, setUser] = useState('');
  const history = useHistory();
  const { state } = history.location;

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const login = () => {
    setAuthedUser(user)
    if (state?.from.length) {
      return history.push(state.from);
    }
    history.push('/')
  }

  return (
    <Card>
      <div className="heading">Log In As</div>
      <div className="avatar-wrapper">
        {user.length ? (
          <img src={users[user].avatarURL} alt="avatar" />
        ) : (
          <img src={Avatar} alt="avatar" />
        )}
      </div>

      <Box sx={{ m: 2 }}>
        <Typography variant="h7" component="div" sx={{ display: { xs: 'none', sm: 'block' }, mb: 1 }}>
          Select User to log in as...
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">User</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            label="User"
            onChange={handleChange}
            style={{ height: '45px' }}
          >
            {Object.values(users).map((user) => (
              <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <button
        onClick={() => login()}
      >
        Login
      </button>
    </Card>
  )
}

const mapStateToProps = ({ users }) => {
  return {
    users
  }
}

export default connect(mapStateToProps, { setAuthedUser })(Login)
