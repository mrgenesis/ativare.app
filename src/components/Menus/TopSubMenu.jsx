import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';

import { routesConfig } from '../../constants/routesConfig';


const useStyles = makeStyles((theme) => ({
  subMenu: {
    marginBottom: theme.spacing(5)
  }
}));

export default function CustomizedBreadcrumbs({ firstPath }) {
  const classes = useStyles();
  const routesStructure = Object.values(routesConfig[firstPath]);
  const [showMenuPages, setShowMenuPages] = React.useState(null);
  const openMenuPage = Boolean(showMenuPages);

  const handleMainMenu = event => setShowMenuPages(event.currentTarget);

  const closeMainMenu = () => setShowMenuPages(null);

  return (
    <>
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
        {routesStructure.map((itemMenu, index) => {
          if (itemMenu.displayName !== routesConfig[firstPath].home.displayName) {
            return <MenuItem key={index} onClick={closeMainMenu}>
              <Link
                style={{ textDecoration: 'none' }}
                to={itemMenu.front}
              >
                {itemMenu.displayName}
              </Link>
            </MenuItem>
          }
          return '';
        })}
      </Menu>

      <Breadcrumbs className={classes.subMenu} aria-label="breadcrumb">
        <Chip variant='outlined' label={<Link to='/'>Home</Link>} size="small" icon={<HomeIcon />} />
        <Chip label={<Link to={routesConfig[firstPath].home.front}>{routesConfig[firstPath].home.displayName}</Link>} size="small" />
        <Chip variant='outlined' label='mais' size="small" deleteIcon={<ExpandMoreIcon />} onDelete={handleMainMenu} />
      </Breadcrumbs>
    </>
  );
}
