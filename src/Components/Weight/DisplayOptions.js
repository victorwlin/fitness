import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Title from "../Dashboard/Title";
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));


const DisplayOptions = props => {
    const classes = useStyles();
    const [datesToShow, setDatesToShow] = React.useState(14);
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());

    const handleChange = event => {
        const { name, value } = event.target;
        if (name === "datesToShow") {
            setDatesToShow(value);
            props.onChange(value);
        } else if (name === "startDate") {
            setStartDate(value);
        } else if (name === "endDate") {
            setEndDate(value);
        }
    };

    const onFormSubmit = event => {
        event.preventDefault();
        const formatStartDate = new Date(startDate);
        const formatEndDate = new Date(endDate);

        if (formatStartDate <= formatEndDate) {
          props.onFormSubmit(formatStartDate, formatEndDate);
        } else {
          window.alert("Start date must be before end date.");
        }
        
    };
    
    return (
        <div>
        <Title>Table Display Options</Title>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="datesToShow">Dates to Show</InputLabel>
        <Select
          labelId="datesToShow"
          id="datesToShow"
          value={datesToShow}
          onChange={handleChange}
          label="Dates to Show"
          name="datesToShow"
        >
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={21}>21</MenuItem>
          <MenuItem value={28}>28</MenuItem>
          <MenuItem value={35}>35</MenuItem>
        </Select>
        </FormControl>
        
        <Divider />

        <Typography>Custom Range</Typography>
        <form
        className={classes.container}
        noValidate
        onSubmit={event => onFormSubmit(event)}
        >
      <TextField
        id="startDate"
        label="Start Date"
        type="date"
        value={startDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        margin="normal"
        onChange={event => handleChange(event)}
        name="startDate"
      />
      <TextField
        id="endDate"
        label="End Date"
        type="date"
        value={endDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        margin="normal"
        onChange={event => handleChange(event)}
        name="endDate"
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
};

export default DisplayOptions;