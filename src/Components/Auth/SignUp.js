import React, { useState } from "react";
import { Link, useNavigate } from "@reach/router";

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
        <LinkUI color="inherit" href="https://weight-tracker-d90aa.web.app/">
          Weight Tracker
        </LinkUI>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}


export default function SignUp() {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const onChangeHandler = event => {
        const {name, value} = event.currentTarget;
    
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    
    
    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {        
        event.preventDefault();
    
        try{
            await auth.createUserWithEmailAndPassword(email, password);
            navigate("/");
        }
        catch(error){
            setError(error);
        }
    };


    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form
                className={classes.form}
                noValidate
                onSubmit={event => {createUserWithEmailAndPasswordHandler(event, email, password)}}
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
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={event => onChangeHandler(event)}
            />
            <FormHelperText error={true}>{error ? error.message : null}</FormHelperText>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign Up
            </Button>
            <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                <Link to="/signin">
                    Already have an account? Sign In
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