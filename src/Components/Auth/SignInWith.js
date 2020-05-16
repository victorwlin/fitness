import React from "react";
import { Link } from "@reach/router";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinkUI from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { signInWithGoogle } from "../../firebase";


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <LinkUI color="inherit" href="https://fitness-bcc01.web.app/">
          Weight Tracker
        </LinkUI>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}


export default function SignInWith() {
    const classes = useStyles();


    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar alt="Weight Scale" src="./scale192.png" />
            <Typography component="h1" variant="h4">
            Weight Tracker
            </Typography>
            <Typography variant="body1">
                This is an app that helps you track your weight. Please sign in to get started.
            </Typography>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={event => signInWithGoogle(event)}
            >
                Sign In With Google
            </Button>
            <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                <Link to="/signIn">
                    Sign in with email
                </Link>
                </Grid>
            </Grid>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
        </Container>
    );
}