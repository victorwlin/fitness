import React, { useState, useEffect, useContext } from "react";

import { firestore } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";
import createDisplay from "./createDisplay";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
}));


const Render = () => {
    const classes = useStyles();
    
    const [datesToShow, setDatesToShow] = useState(14);
    const [weights, setWeights] = useState({});
    
    const user = useContext(UserContext);
    const { email } = user;


    useEffect(
        () => {
            // Pull data from Firestore by adding a listener
            firestore.collection(email).onSnapshot((querySnapshot) => {
                
                // Create weights object with all data available in database
                const weightHolder = {};

                querySnapshot.forEach(doc => {
                    const date = doc.id;
                    weightHolder[date] = doc.data().weight;
                });

                setWeights(weightHolder);

            });
        },
        []
    );


    const onNumOfDatesChange = event => {
        setDatesToShow(event.target.value);
    };


    const showDates = () => {
        const combined = createDisplay(weights, datesToShow);
     
        return (
            Object.keys(combined).map(obj => {
                return (
                    <TableRow key={obj}>
                        <TableCell>{obj}</TableCell>
                        <TableCell>{combined[obj]}</TableCell>
                    </TableRow>
                );
            })
        );
    };


    // Render table
    return (
        <React.Fragment>
        <Table size="small">
            <TableHead>
            <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Weight</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {showDates()}
            </TableBody>
        </Table>
        </React.Fragment>
    );
};

export default Render;