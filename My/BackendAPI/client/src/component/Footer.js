import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  ShoppingCart:{
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} align="center">
            Currently v4.6.1. Released under the MIT License. Copyright © 2019 Material-UI.
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

