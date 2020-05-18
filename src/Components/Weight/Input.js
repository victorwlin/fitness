import React, { useState, useEffect, useContext } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { firestore } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";
import Title from "../Dashboard/Title";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function Input() {
  const classes = useStyles();

    // I am initializing state with an object, because I want the dates
    // and weights to be locked together.
    const [entry, setEntry] = useState({ date: "", weight: "" });

    const user = useContext(UserContext);
    const { email } = user;

    useEffect(
        () => {
            // Calculate today's date and set to default in the form
            const date = new Date();
            const today = date.toISOString().substring(0, 10);
            
            setEntry({ ...entry, date: today });
        }, []
    );

    const onChangeHandler = event => {
        
        const {id, value} = event.currentTarget;

        if (id === "date") {
            setEntry({ ...entry, date: value });
        } else if (id === "weight") {
            setEntry({ ...entry, weight: value });
        }
    };

    // This function submits the entry to Firestore
    const onFormSubmit = event => {
        // This prevents the page from refreshing every time something is
        // submitted
        event.preventDefault();
        
        // Check if there is a date and submit to Tracking
        if (entry.date) {
            // Format dates
            const year = entry.date.substring(0, 4);
            const month = entry.date.substring(5, 7);
            const displayMonth =
                    (month == 1) ? "JAN" :
                    (month == 2) ? "FEB" :
                    (month == 3) ? "MAR" :
                    (month == 4) ? "APR" :
                    (month == 5) ? "MAY" :
                    (month == 6) ? "JUN" :
                    (month == 7) ? "JUL" :
                    (month == 8) ? "AUG" :
                    (month == 9) ? "SEP" :
                    (month == 10) ? "OCT" :
                    (month == 11) ? "NOV" :
                    "DEC";
            const date = parseInt(entry.date.substring(8, 10));
            const displayDate = (date < 10) ? (`0${date}`) : date;
    
            const formattedDate = `${displayDate} ${displayMonth} ${year}`;

            // Submit to Firestore
            firestore.collection(email).doc(formattedDate).set({
                weight: entry.weight
            })
            console.log(entry);
            // Reset form fields to empty
            setEntry({ date: "", weight: "" });

        } else {
            window.alert("Please enter a date");
        }
    };


  return (
    <div>
    <Title>Enter & Edit</Title>
    <form
        className={classes.container}
        noValidate
        onSubmit={event => onFormSubmit(event)}
    >
      <TextField
        id="date"
        label="Date"
        type="date"
        value={entry.date}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        margin="normal"
        onChange={event => onChangeHandler(event)}
      />
      <TextField
        id="weight"
        label="Weight"
        type="number"
        value={entry.weight}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        margin="normal"
        onChange={event => onChangeHandler(event)}
      />
      <Grid container>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        >
        Submit
      </Button>
    </Grid>
    </form>
    </div>
  );
}