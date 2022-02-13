import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import {  AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux'; 
import decode from 'jwt-decode';

import intotechLogo from '../../images/InToTechLogo.png';
import intotechText from '../../images/InToTechText.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';


const Navbar = () => {
      const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
      const dispatch = useDispatch(); 
      const navigate = useNavigate(); 
      const location = useLocation(); 
      const classes = useStyles();

      const logout = () => {
        dispatch({ type: actionType.LOGOUT }); 

        navigate('/auth');

        setUser(null); 
      };

      useEffect(() => {
        const token = user?.token; 

        if (token) {
          const decodedToken = decode(token);

          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);

    return (
    <AppBar className={classes.appBar} position="static" style={{ backgroundColor: "white" }}>
      <Link to="/" className={classes.brandContainer}>
      <img component={Link} to="/" src={intotechText} alt="icon" height="45px" />
        <img className={classes.image} src={intotechLogo} alt="icon" height="60" />
        </Link>
        <Toolbar className={classes.toolbar}>
            {user?.result ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} style={{ backgroundColor: "lightgrey" }} onClick={logout}>Logout</Button>
                </div>
            ) : (
                <Button component={Link} to="/auth" variant="contained" style={{ backgroundColor: "lightgrey" }}>Sign In</Button>
            )}
        </Toolbar>
    </AppBar>
    );
};

export default Navbar;
