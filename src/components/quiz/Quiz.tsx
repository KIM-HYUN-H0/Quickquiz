import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    addButton: {
        position: 'fixed',
        bottom: '100px',
        right: '50px',
        backgroundColor: 'black',
        color: 'white'
    },
    paper : {
        height : theme.spacing(10)
    }
}))
const Quiz = (props: any) => {

    const { data } = props;
    const classes = useStyles();
    return (
        <>
            {data.length > 0 ?
                data.map((a: any) => {
                    console.log(a.date);
                    return (
                        <Paper className={classes.paper} elevation={3}>
                            {a.title} <br />
                            {moment(a.date.toDate()).fromNow()}
                        </Paper>
                    )
                })
                :
                null}
            <Fab component={Link} to="/write" className={classes.addButton}>
                <AddIcon />
            </Fab>
        </>
    )
}

export default Quiz;