import React from "react"

import { withStyles } from '@material-ui/core/styles';
import {
    CardActions,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Fab, Grid,
} from "@material-ui/core";
import {
    Edit as EditIcon,
    Delete as DeleteIcon
} from "@material-ui/icons"

import red from "@material-ui/core/colors/red";
import {blue} from "@material-ui/core/colors";
import green from "@material-ui/core/colors/green";

import Instance from './Instance'
import Config from './Config'

const styles = () => ({
    root: {
        display: 'flex',
        mb: 6,
        width : "auto"
    },
    content: {
        width: 400
    },
    logo: {
        width: 150,
        height: 100,
        margin: 30
    },
    actions: {
        paddingRight: 20
    },
    typography: {
        paddingBottom: 10
    },
    buttons: {
        paddingRight:5
    },
    deleteButton: {
        color: '#fff',
        backgroundColor: red[500],
    },
    editButton: {
        color: '#fff',
        backgroundColor: blue[500],
    },
    addSettings: {
    color: '#fff',
    backgroundColor: green[500],
}
})


class Connector extends React.Component {


    deleteHandler = () => {
        this.props.deleteConnector(this.props.id)
    }

    render () {
        const { classes } = this.props;
        return (
            <Grid item xs={12}>
                <Card className={classes.root}>
                    {this.props.image ? <CardMedia image={this.props.image} className={classes.logo}/> : null}
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h5" component="h1" className={classes.typography}>
                            {this.props.title}
                        </Typography>
                        {this.props.chip}
                        <Typography mb={4} component="p" className={classes.typography}>
                            {this.props.description}
                        </Typography>
                        <Grid container>
                            <Grid item className={classes.buttons}>
                                <Fab aria-label="delete" variant="extended" className={classes.deleteButton}
                                     onClick={this.deleteHandler}>
                                    <DeleteIcon/>
                                </Fab>
                            </Grid>
                            <Grid item className={classes.buttons}>
                                <Fab aria-label="edit" variant="extended" className={classes.editButton}>
                                    <EditIcon/>
                                </Fab>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Grid item xs/>

                    <CardActions className={classes.actions}>
                        <Grid container spacing={2}>
                            {this.props.instances.map(instance => {
                                return (
                                    <Grid item key={instance.configName}>
                                        <Instance
                                            connector={this.props.id}
                                            config={this.props.config}
                                            configName={instance.configName}
                                            configURL={instance.configURL}
                                            configAPIID={instance.configAPIID}
                                            configAPISecret="**"
                                            configInSecure={instance.configInSecure}
                                            configProxy={instance.configProxy}
                                            enabled={instance.enabled}
                                            deleteInstance={this.props.deleteInstance}
                                            updateInstance={this.props.updateInstance}
                                            updateInstanceError={this.props.updateInstanceError}
                                            deleteInstanceError={this.props.deleteInstanceError}
                                            clearUpdateInstanceError={this.props.clearUpdateInstanceError}
                                            clearDeleteInstanceError={this.props.clearDeleteInstanceError}
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>

                        <Config
                            connector={this.props.id}
                            config={this.props.config}
                            addInstance={this.props.addInstance}
                            addInstanceError={this.props.addInstanceError}
                            clearAddInstanceError={this.props.clearAddInstanceError}
                        />
                    </CardActions>

                </Card>
            </Grid>
        )
    }
}

export default withStyles(styles)(Connector)