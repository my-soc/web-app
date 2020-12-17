import React from 'react'
import {
    makeStyles,
    Paper,
    InputBase,
    Divider,
    IconButton
} from '@material-ui/core'
import {
    PlaylistPlay,
    Menu as MenuIcon
} from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',

    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
    iconButton: {
        padding: 10
    },
    divider: {
        height: 28,
        margin: 4
    }
}))

const Cli = (props) => {
    const classes = useStyles();

    const enterHandler = (e) => {
        e.key === 'Enter' && e.preventDefault()
        if (e.key === 'Enter') {
            let entry={
                content: e.target.value
            }
            props.postEntry(entry)
        }
    }

    return (
        <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <InputBase
                autoFocus
                className={classes.input}
                placeholder="Creat a new Entry"
                onKeyDown={enterHandler}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                <PlaylistPlay />
            </IconButton>
        </Paper>
    );
}

export default Cli