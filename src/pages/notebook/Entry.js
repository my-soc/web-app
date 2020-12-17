import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    IconButton,
    Typography,
    CardContent,
    CardActions,
    Card,
    Grid,
    Box,
    Avatar
} from "@material-ui/core"
import {
    Assignment,
    Cancel,
    PlayCircleFilled
} from "@material-ui/icons"
import {
    pink,
    green,
    blue
} from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 16
    },
    title: {
        fontSize: 18,
        paddingLeft: 10
    },
    pos: {
        marginBottom: 12
    },
    avatar: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    pink: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
    },
    green: {
        color: '#fff',
        backgroundColor: green[500],
    },
    blue: {
        color: '#fff',
        backgroundColor: blue[500],
    }
}))

const Entry = (props) => {

    const classes = useStyles()

     const deleteHandler = () => {
         props.deleteEntry(props.entryID)
     }

    return (
        <Box display="stretch" borderRadius={16} borderColor="secondary.main" boxShadow={2} >
            <Card className={classes.root} >
                <CardActions>
                    {props.entryCommand?
                        <div className={classes.avatar}>
                            <Avatar className={classes.blue}>
                                <PlayCircleFilled />
                            </Avatar>
                        </div>
                    :
                        <div className={classes.avatar}>
                            <Avatar className={classes.green}>
                                <Assignment />
                            </Avatar>
                        </div>}
                    <Typography className={classes.title} >
                        <b>Entry: #</b>{props.entryID}
                    </Typography>
                    <Grid item xs/>
                    <IconButton aria-label="entry" size={"small"} color={"inherit"} onClick={deleteHandler}>
                        <Cancel />
                    </IconButton>
                </CardActions>
                <CardContent >
                    <Typography className={classes.pos} variant="h5">
                        Entry Details: <b  color={"primary"}> {props.entryCommand} </b>
                    </Typography>
                    <Typography variant="body2" component="p">
                        {props.entryContent}
                    </Typography>
                </CardContent>

            </Card>
        </Box>
    );
}

export default Entry