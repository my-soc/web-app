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
    Delete as DeleteIcon,
    Edit as EditIcon,
    Cancel as CancelIcon,
    Save as SaveIcon,
} from "@material-ui/icons";
import {blue, red} from "@material-ui/core/colors";
import Alert from "@material-ui/lab/Alert";

const styles = () => ({
    red: {
        color: '#fff',
        backgroundColor: red[500],
    },
    blue: {
        color: '#fff',
        backgroundColor: blue[500],
    },
    dialogActions: {
        paddingBottom: 15,
        paddingRight: 15
    },
    checkbox: {
        paddingLeft: 15
    }
})


class InstanceDialog extends React.Component{

    initialState = {
        instanceConfig: {
            configName: this.props.configName,
            configURL: this.props.configURL,
            configAPIID: this.props.configAPIID,
            configAPISecret: this.props.configAPISecret,
            configInSecure: this.props.configInSecure,
            configProxy: this.props.configProxy,
            enabled:this.props.enabled
        },
        instanceDialog: {
            open: false,
            requiredFieldError: false
        },
        instanceUpdates:{
            configInSecure: this.props.configInSecure,
            configProxy: this.props.configProxy,
            enabled:this.props.enabled
        }

    }

    state = {
        ...this.initialState
    }

    //Connectors Instances Handlers
    handleInstanceOpen = () => {
        this.setState({
            instanceDialog: {
                ...this.state.instanceDialog,
                open: true
            }
        })
    }
    handleInstanceClose = () => {
        this.setState({
            instanceDialog: {
                ...this.state.instanceDialog,
                open: false
            }
        })
    }
    handleInstanceUpdate = () => {
        if (this.state.instanceUpdates.configName === "") {
            this.setState({
                ...this.state,
                instanceDialog: {
                    open: true,
                    requiredFieldError: true,
                }
            })
        } else {
            this.props.updateInstance(this.props.connector, this.state.instanceConfig.configName, this.state.instanceUpdates)
            this.setState({
                instanceConfig: {
                    ...this.state.instanceConfig,
                    ...this.state.instanceUpdates
                },
                instanceDialog: {
                    ...this.state.instanceDialog,
                    open: false
                }
            })
        }
    }
    handleInstanceDelete = () => {
        this.props.deleteInstance(this.props.connector,this.state.instanceConfig.configName)
        this.setState({
            instanceDialog: {
                ...this.state.instanceDialog,
                open: false
            }
        })
    }
    handleInstanceNameChange = (e) => {
        this.setState({
            instanceUpdates:{
                ...this.state.instanceUpdates,
                configName: e.target.value
            }
        })
    }
    handleInstanceURLChange = (e) => {
        this.setState({
            instanceUpdates:{
                ...this.state.instanceUpdates,
                configURL: e.target.value
            }
        })
    }
    handleInstanceAPIIDChange = (e) => {
        this.setState({
            instanceUpdates:{
                ...this.state.instanceUpdates,
                configAPIID: e.target.value
            }
        })
    }
    handleInstanceAPISecretChange = (e) => {
        this.setState({
            instanceUpdates:{
                ...this.state.instanceUpdates,
                configAPISecret: e.target.value
            }
        })
    }
    handleInstanceInSecureChange = () => {
        let insecure = !this.state.instanceConfig.configInSecure;
        this.setState({
            instanceUpdates:{
                ...this.state.instanceUpdates,
                configInSecure: insecure
            }
        })
    }
    handleInstanceProxyChange = () => {
        let proxy = !this.state.instanceConfig.configProxy;
        this.setState({
            instanceUpdates:{
                ...this.state.instanceUpdates,
                configProxy: proxy
            }
        })
    }
    handleEnabledChange = () => {
        let enabled = !this.state.instanceConfig.enabled;
        this.setState({
            instanceUpdates:{
                ...this.state.instanceUpdates,
                enabled: enabled
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
            this.state.instanceDialog.requiredFieldError ?
                <Alert variant="filled" severity="error" onClose={this.clearRequiredFieldError}>
                    Please fill the required fields
                </Alert>
                : null
        )
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                {this.state.instanceConfig.enabled ?
                    <Fab variant="extended" className={classes.blue} onClick={this.handleInstanceOpen}>
                        {this.state.instanceConfig.configName}
                        <EditIcon/>
                    </Fab> :
                    <Fab variant="extended" onClick={this.handleInstanceOpen}>
                        {this.state.instanceConfig.configName}
                        <EditIcon/>
                    </Fab>
                }
                <Dialog

                    open={this.state.instanceDialog.open}
                    onClose={this.handleInstanceClose} aria-labelledby="form-dialog-title" fullWidth>
                    <DialogTitle id="form-dialog-title">
                        Configurations
                    </DialogTitle>
                    <DialogContent>
                        {this.returnErrors()}
                        <TextField margin={"dense"} id="name" label="Name" type={"TextField"} fullWidth
                                   defaultValue={this.state.instanceConfig.configName}
                                   onChange={this.handleInstanceNameChange}/>
                        {
                            this.props.config.map(parameter => {
                                return (
                                    parameter.name === 'url' ?
                                        <TextField required={parameter.required} margin={"dense"} key={parameter.name}
                                                   id="url" label="URL" type={"TextField"} fullWidth
                                                   defaultValue={this.state.instanceConfig.configURL ? this.state.instanceConfig.configURL : ""}
                                                   onChange={this.handleInstanceURLChange}/>
                                        : parameter.name === 'apiID' ?
                                        <TextField required={parameter.required} margin={"dense"} key={parameter.name}
                                                   id="apiID" label="API ID" type={"TextField"} fullWidth
                                                   defaultValue={this.state.instanceConfig.configAPIID ? this.state.instanceConfig.configAPIID : ""}
                                                   onChange={this.handleInstanceAPIIDChange}/>
                                        : parameter.name === 'apiSecret' ?
                                            <TextField required={parameter.required} margin={"dense"}
                                                       key={parameter.name} id="apiSecret" label="API Secret"
                                                       type={"TextField"} fullWidth
                                                       defaultValue={this.state.instanceConfig.configAPISecret ? this.state.instanceConfig.configAPISecret : ""}
                                                       onChange={this.handleInstanceAPISecretChange}/>
                                            : parameter.name === 'insecure' ?
                                                <FormControlLabel key={parameter.name}
                                                                  control={<Checkbox key={parameter.name} id="insecure"
                                                                                     name="insecure"
                                                                                     checked={this.state.instanceUpdates.configInSecure? this.state.instanceUpdates.configInSecure : false}
                                                                                     onChange={this.handleInstanceInSecureChange}/>}
                                                                  label="Validate SSL"/>
                                                : parameter.name === 'proxy' ?
                                                    <FormControlLabel key={parameter.name}
                                                                      control={<Checkbox key={parameter.name} id="proxy"
                                                                                         name="proxy"
                                                                                         checked={this.state.instanceUpdates.configProxy ? this.state.instanceUpdates.configProxy : false}
                                                                                         onChange={this.handleInstanceProxyChange}/>}
                                                                      label="Use Proxy"/>
                                                    : null
                                )
                            })
                        }
                    </DialogContent>
                    <DialogActions className={classes.dialogActions}>
                        <FormControlLabel className={classes.checkbox}
                                          control={<Checkbox checked={this.state.instanceUpdates.enabled ? this.state.instanceUpdates.enabled : false}
                                                             name="enabled"
                                                             onChange={this.handleEnabledChange}/>}
                                          label="Enabled"/>
                        <Grid item xs/>
                        <Fab color="default" aria-label="delete" size={"small"} className={classes.red}
                             variant="extended" onClick={this.handleInstanceDelete}>
                            <DeleteIcon/>
                        </Fab>
                        <Fab color="default" aria-label="save" size={"small"} className={classes.blue}
                             variant="extended" onClick={this.handleInstanceUpdate}>
                            <SaveIcon/>
                        </Fab>
                        <Fab color="default" aria-label="cancel" size={"small"} variant="extended"
                             onClick={this.handleInstanceClose}>
                            <CancelIcon/>
                        </Fab>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(InstanceDialog)