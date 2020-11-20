import React from 'react';
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { Link } from "react-router-dom";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CategoryIcon from '@material-ui/icons/Category';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';

const useStyles = makeStyles({
    root: {
        marginTop: '500px',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 1,
        textAlign : 'center'
    },
    tabs : {
        width : '100%',
        display : 'inline-block',
        maxWidth : '1024px',
    }
})

const Navigation = () => {
    const classes = useStyles();
    return (
        <>
            <Paper elevation={2} className={classes.root}>
                <Tabs variant="fullWidth" className={classes.tabs}>
                    <Tab
                        component={Link}
                        to="/quiz"
                        icon={<HelpOutlineIcon />}
                        label="Question"
                    />
                    <Tab
                        component={Link}
                        to="/category"
                        icon={<CategoryIcon />}
                        label="Category"
                    />
                    <Tab
                        component={Link}
                        to="/chat"
                        icon={<TextsmsOutlinedIcon />}
                        label="Chat"
                    />
                    <Tab
                        component={Link}
                        to="/complete"
                        icon={<SearchIcon />}
                        label="Complete"
                    />
                </Tabs>
            </Paper>
        </>
    )
}

export default Navigation;