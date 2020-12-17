/*
Imports
*/
//External Imports
import React from 'react'
import {
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Grid,
    Checkbox,
    FormControlLabel
} from '@material-ui/core'
import {withStyles} from "@material-ui/core/styles"
import {
    Add as AddIcon,
    Cancel as CancelIcon,
    Save as SaveIcon,
} from "@material-ui/icons";
import {blue, green, red} from "@material-ui/core/colors";
import Alert from "@material-ui/lab/Alert";

/*
Stylers
*/
const styles = () => ({
    red: {
        color: '#fff',
        backgroundColor: red[500],
    },
    blue: {
        color: '#fff',
        backgroundColor: blue[500],
    },
    green: {
        color: '#fff',
        backgroundColor: green[500],
    },
    dialogActions: {
        paddingBottom: 15,
        paddingRight: 15
    },
    checkbox: {
        paddingLeft: 15
    }
})

/*
The Config Component Function
*/
class ConfigDialog extends React.Component{

    initialState ={
        configDialog: {
            open: false,
            requiredFieldError:false
        },
        config:{
            configName: "",
            configURL: "",
            configAPIID: "",
            configAPISecret: "",
            configInSecure: false,
            configProxy: false,
            enabled:true
        }
    }

    state ={
        ...this.initialState
    }

    //Connectors Config Handlers

    handleConfigOpen = () => {
        this.setState({
            ...this.initialState,
            configDialog: {
                ...this.state.configDialog,
                open: true
            }
        })
    }
    handleConfigClose = () => {
        this.setState({
            ...this.initialState,
            configDialog: {
                ...this.state.configDialog,
                open: false,
                requiredFieldError: false
            }
        })
    }
    handleConfigSave = () => {
        if (this.state.config.configName === "") {
            this.setState({
                ...this.state,
                configDialog: {
                    open: true,
                    requiredFieldError:true,
                }
            })
        } else {
            this.props.addInstance(this.props.connector,this.state.config)
            this.setState({
                configDialog: {
                    open: false,
                    requiredFieldError:false,
                }
            })
        }
    }
    handleConfigNameChange = (e) => {
        this.setState({
            ...this.state,
            config:{
                ...this.state.config,
                configName: e.target.value
            }
        })
    }
    handleConfigURLChange = (e) => {
        this.setState({
            ...this.state,
            config:{
                ...this.state.config,
                configURL: e.target.value
            }
        })
    }
    handleConfigAPIIDChange = (e) => {
        this.setState({
            ...this.state,
            config:{
                ...this.state.config,
                configAPIID: e.target.value
            }
        })
    }
    handleConfigAPISecretChange = (e) => {
        this.setState({
            ...this.state,
            config:{
                ...this.state.config,
                configAPISecret: e.target.value
            }
        })
    }
    handleConfigInSecureChange = () => {
        let insecure = !this.state.config.configInSecure;
        this.setState({
            ...this.state,
            config:{
                ...this.state.config,
                configInSecure: insecure
            }
        })
    }
    handleConfigProxyChange = () => {
        let proxy = !this.state.config.configProxy;
        this.setState({
            ...this.state,
            config:{
                ...this.state.config,
                configProxy: proxy
            }
        })
    }

    clearRequiredFieldError = () => {
        this.setState({
            ...this.state,
            configDialog:{
                ...this.state.configDialog,
                requiredFieldError: false
            }
        })
    }

    returnErrors = () => {
        return (
            this.state.configDialog.requiredFieldError ?
                <Alert variant="filled" severity="error" onClose={this.clearRequiredFieldError}>
                    Please fill the required fields
                </Alert>
                : null
        )
    }

    parameters = (
            this.props.config.map(parameter => {
                return (
                    parameter.name === 'url' ?
                        <TextField required={parameter.required} margin={"dense"} key={parameter.name} id="url" label="URL" type={"TextField"} fullWidth onChange={this.handleConfigURLChange} />
                        : parameter.name === 'apiID' ?
                        <TextField required={parameter.required} margin={"dense"} key={parameter.name} id="apiID" label="API ID" type={"TextField"} fullWidth onChange={this.handleConfigAPIIDChange}/>
                        : parameter.name === 'apiSecret' ?
                        <TextField required={parameter.required} margin={"dense"} key={parameter.name} id="apiSecret" label="API Secret" type={"TextField"} fullWidth onChange={this.handleConfigAPISecretChange}/>
                        : parameter.name === 'insecure' ?
                        <FormControlLabel key={parameter.name} control={<Checkbox key={parameter.name} id="insecure" name="insecure" onClick={this.handleConfigInSecureChange}/>} label="Validate SSL"/>
                        : parameter.name === 'proxy' ?
                        <FormControlLabel key={parameter.name} control={<Checkbox key={parameter.name} id="proxy" name="proxy" onClick={this.handleConfigProxyChange}/>} label="Use Proxy"/>
                        : null
                )
            })
        )

    render(){
        const { classes } = this.props
        return (
            <div>
                <Fab color="primary" aria-label="add" variant="extended" className={classes.green} onClick={this.handleConfigOpen}>
                    {this.props.name}
                    <AddIcon/>
                </Fab>
                <Dialog open={this.state.configDialog.open} onClose={this.handleConfigClose} aria-labelledby="form-dialog-title" fullWidth>
                    <DialogTitle id="form-dialog-title">
                       Configurations
                    </DialogTitle>
                    <DialogContent >
                        {this.returnErrors()}
                        <TextField required margin={"dense"} id="name" label="Name" type={"TextField"} fullWidth onChange={this.handleConfigNameChange}/>
                        {this.parameters}
                    </DialogContent>
                    <DialogActions className={classes.dialogActions} >
                        <Grid item xs />
                        <Fab color="default" aria-label="save" size={"small"} className={classes.blue} variant="extended" onClick={this.handleConfigSave}>
                            <SaveIcon />
                        </Fab>
                        <Fab color="default" aria-label="cancel" size={"small"} variant="extended" onClick={this.handleConfigClose}>
                            <CancelIcon />
                        </Fab>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(ConfigDialog)