import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/authedUser';
import { Link, useLocation, useHistory } from 'react-router-dom'

const StyledAppBar = styled(AppBar)`
  && {
  .MuiToolbar-root {
      background: #9B51E0 !important;
    }
  }
`;

const NabLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 50px;

  a {
    text-decoration: none;
    color: #FFFFFF;
  }
`;

const NabLink = styled('div')(({ active }) => ({
  margin: '0 20px',
  fontWeight: `${active ? 'bold' : 'auto'}`,
  borderBottom: `${active ? '2px solid #fff' : 'none'}`,
  padding: '0px 5px 2px 5px',
}));

const NavBar = ({ authedUser, logoutUser, users }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const history = useHistory();

  const logOut = () => {
    logoutUser()
    history.push('/login')
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            WY-rather
          </Typography>
          {authedUser && (
            <NabLinks>
              <NabLink 
                active={location.pathname === '/'}>
                <Link to="/">
                  Home
                </Link>
              </NabLink>
              <NabLink 
                active={location.pathname === '/add'}>
                <Link to="/add">
                  New Question
                </Link>
              </NabLink>
              <NabLink 
                active={location.pathname === '/leaderboard'}>
                <Link to="/leaderboard">
                  Leader Board
                </Link>
              </NabLink>
            </NabLinks>
          )}
          <Box sx={{ flexGrow: 1 }} />
          {authedUser ? (
            <div>
              <h7>{users[authedUser].name}</h7>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <img className="avatar" src={users[authedUser].avatarURL} alt="avatar" style={{width: '40px', height: '40px', borderRadius: '20px'}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logOut}>Log out</MenuItem>
              </Menu>
            </div>
          ) : (
            <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Login
            </Typography>
          )}
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    users
  }
}
export default connect(mapStateToProps, { logoutUser })(NavBar)