import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

import PagesIcon from '@material-ui/icons/Pages';
import { Context } from '../../store/Store';

import { routesConfig } from '../../constants/routesConfig';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  appBar: {
    boxShadow: 'none'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
}));
export default function MenuAppBar() {
  const classes = useStyles();
  const [state, dispatch] = React.useContext(Context);
  const [showMenuUser, setShowMenuUser] = React.useState(null);
  const [showMenuPages, setShowMenuPages] = React.useState(null);
  const open = Boolean(showMenuUser);
  const openMenuPage = Boolean(showMenuPages);

  const handleMainMenu = event => setShowMenuPages(event.currentTarget);
  const handleMenu = event => setShowMenuUser(event.currentTarget);

  const closeMainMenu = () => setShowMenuPages(null);
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    setShowMenuUser(null);
  }


  return (
    <div className={classes.root}>
      <AppBar position="static" color='transparent' className={classes.appBar}>
        <Toolbar>
          <Link to='/'><img src='/logo-ativare192.png' width='120px' alt='Logo' /></Link>
          <div className={classes.grow} />
          <div>
            {state.authData && (
              <>
                <IconButton
                  aria-label="main menu top bar"
                  aria-controls="main-menu"
                  aria-haspopup="true"
                  onClick={handleMainMenu}
                  color="inherit"
                >
                  <PagesIcon />
                </IconButton>
                <Menu
                  id="main-menu"
                  anchorEl={showMenuPages}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={openMenuPage}
                  onClose={closeMainMenu}
                >
                  {Object.values(routesConfig).map((itemMenu, index) => {
                    if (typeof itemMenu !== 'string') {
                      return <MenuItem key={index} onClick={closeMainMenu}>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={itemMenu.home.front}
                        >
                          {itemMenu.home.displayName}
                        </Link>
                      </MenuItem>
                    }
                    return '';
                  })}
                </Menu>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={showMenuUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={() => setShowMenuUser(null)}
                >
                  <MenuItem onClick={logout}>Sair</MenuItem>
                </Menu>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Divider />
    </div>
  );
}
