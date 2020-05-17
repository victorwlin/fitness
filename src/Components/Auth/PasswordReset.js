import React, { useState } from "react";
import { Link } from "@reach/router";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LinkUI from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormHelperText } from "@material-ui/core";

import { auth } from "../../firebase";


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


export default function PasswordReset() {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [error, setError] = useState(null);


    const onChangeHandler = event => {
        const {name, value} = event.currentTarget;
    
        if (name === "email") {
            setEmail(value);
        }
    };
    
    
    const sendResetEmail = (event, email) => {
        event.preventDefault();
    
        auth
            .sendPasswordResetEmail(email)
            .then(() => {
                setEmailHasBeenSent(true);
                // setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
            })
            .catch(error => {setError(error)});
    };


    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Password Reset
            </Typography>
            <form
                className={classes.form}
                noValidate
                onSubmit={event => {sendResetEmail(event, email)}}
            >
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={event => onChangeHandler(event)}
            />
            <FormHelperText>{emailHasBeenSent ? "Email has been sent." : null}</FormHelperText>
            <FormHelperText error>{error ? error.message : null}</FormHelperText>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Send Me a Reset Link
            </Button>
            <Grid container>
                <Grid item xs>
                <Link to="/signin">
                    Remember password? Sign In
                </Link>
                </Grid>
                <Grid item>
                <Link to="/signup">
                    Don't have an account? Sign Up
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
        </Container>
    );
}