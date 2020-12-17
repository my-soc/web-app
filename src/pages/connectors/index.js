/*
Imports
*/
//External Imports
import React from "react";
import styled from "styled-components";
import Helmet from 'react-helmet';
import {connect} from "react-redux";
import {
    Divider as MuiDivider,
    Grid,
    Typography as MuiTypography,
    Chip as MuiChip,
    LinearProgress
} from "@material-ui/core";
import {Alert as MuiAlert} from '@material-ui/lab';
import { orange } from "@material-ui/core/colors";
import { spacing } from "@material-ui/system";

//Internal Imports
import Connector from "./Connector";
import UploadFile from "./UploadFile"
import {
    getConnectors,
    uploadConnector,
    deleteConnector,
    addInstance,
    updateInstance,
    deleteInstance,
    clearGetConnectorsError,
    clearRegisterConnectorError,
    clearDeleteConnectorError,
    clearAddInstanceError,
    clearUpdateInstanceError,
    clearDeleteInstanceError
} from "../../redux/actions";

/*
Stylers
*/
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${props => props.rgbcolor};
  color: ${props => props.theme.palette.common.white};
  margin-bottom: ${props => props.theme.spacing(4)}px;
`;
const Alert = styled(MuiAlert)`
  margin-bottom: ${props => props.theme.spacing(4)}px;
`;

/*
The Connectors Page Class
*/
class Connectors extends React.Component {

    //Connectors UI State
    state ={
        uploadDialog: {
            status: false
        }
    }

    //Connectors Upload Handlers
    handleConnectorsUploadOpen = () => {
        this.setState({
            uploadDialog: {
                status: true
            }
        })
    }
    handleConnectorsUploadClose = () => {
        this.setState({
            uploadDialog: {
                status: false
            }
        })
    }
    handleConnectorsUploadSave = (connector) => {
        this.setState({
            uploadDialog: {
                status: false
            }
        })
        this.props.uploadConnector(connector)
    }


    //Class Methods
    componentDidMount = () =>{
        this.props.getConnectors()
    }
    render() {
        let connectors = (
            this.props.connectorsState.connectors?
                <Grid container spacing={6}>
                  {this.props.connectorsState.connectors.map(connector => {
                    return (
                            <Grid item xs={12} lg={6} xl={12} key={connector.ID}>
                              <Connector
                                id={connector.ID}
                                title={connector.DisplayName}
                                description={connector.Description}
                                chip={<Chip label="Not Configured" rgbcolor={orange[500]} />}
                                image={`data:image/jpeg;base64,${connector.Image}`}
                                config={connector.Config}
                                instances={connector.Instances}
                                addInstance={this.props.addInstance}
                                deleteInstance={this.props.deleteInstance}
                                updateInstance={this.props.updateInstance}
                                addInstanceError={this.props.connectorsState.errors.addInstanceError}
                                updateInstanceError={this.props.connectorsState.errors.updateInstanceError}
                                deleteInstanceError={this.props.connectorsState.errors.deleteInstanceError}
                                clearAddInstanceError={this.props.clearAddInstanceError}
                                clearUpdateInstanceError={this.props.clearUpdateInstanceError}
                                clearDeleteInstanceError={this.props.clearDeleteInstanceError}
                                deleteConnector={this.props.deleteConnector}

                              />
                            </Grid>
                    )
                  })}
                </Grid>
            :null
        )
        return (
            <React.Fragment>
              <Helmet title="Connectors" />
              <Grid justify="space-between" container spacing={6}>
                  <Grid item>
                      <Typography variant="h3" gutterBottom display="inline">
                          Connectors
                      </Typography>
                  </Grid>
                  <Grid item>
                      <UploadFile
                          clickUpload={this.handleConnectorsUploadOpen}
                          clickSave={this.handleConnectorsUploadSave}
                          clickClose={this.handleConnectorsUploadClose}
                          open = {this.state.uploadDialog.status}
                          maxFileSize={5000000}
                          dropzoneText = "Drag and drop the connector file here or click"
                          showPreviews={true}
                          acceptedFiles={['.yml']}
                      />
                  </Grid>
              </Grid>
                <Divider my={6} />
                {
                    this.props.connectorsState.loading?
                        <LinearProgress />
                    :this.props.connectorsState.errors.getConnectorsError?
                        <Alert variant="filled"  severity="error" onClose={this.props.clearGetConnectorsError}>
                            Failed to Fetch the Connectors!
                        </Alert>
                    :this.props.connectorsState.errors.registerConnectorError?
                        <Alert variant="filled" severity="error" onClose={this.props.clearRegisterConnectorError}>
                            Failed to Register the Connector!
                        </Alert>
                    :this.props.connectorsState.errors.deleteConnectorError?
                        <Alert variant="filled" severity="error" onClose={this.props.clearDeleteConnectorError}>
                            Failed to Delete the Connector!
                        </Alert>
                    :this.props.connectorsState.errors.addInstanceError?
                        <Alert variant="filled" severity="error" onClose={this.props.clearAddInstanceError}>
                            Failed to add this Instance!
                        </Alert>
                    :this.props.connectorsState.errors.updateInstanceError?
                        <Alert variant="filled" severity="error" onClose={this.props.clearUpdateInstanceError}>
                            Failed to update this Instance!
                        </Alert>
                    :this.props.connectorsState.errors.deleteInstanceError?
                        <Alert variant="filled" severity="error" onClose={this.props.clearDeleteInstanceError}>
                            Failed to delete this Instance!
                        </Alert>
                    :null
                }
                {connectors}
            </React.Fragment>
        );
    }
}

/*
The Redux Mappings
*/
const mapStateToProps = (store) => {
  return ({
    connectorsState: store.connectorsReducer
  })
}
const mapDispatchToProps = (dispatch) => {
  return {
    getConnectors: () => dispatch(getConnectors()),
    uploadConnector: (connector) => dispatch(uploadConnector(connector)),
    deleteConnector: (connector) => dispatch(deleteConnector(connector)),
    addInstance: (connector,config) => dispatch(addInstance(connector,config)),
    updateInstance: (connector,instance,instanceUpdates) => dispatch(updateInstance(connector,instance,instanceUpdates)),
    deleteInstance: (connector,instance) => dispatch(deleteInstance(connector,instance)),
    clearGetConnectorsError: () => dispatch(clearGetConnectorsError()),
    clearRegisterConnectorError: () => dispatch(clearRegisterConnectorError()),
    clearDeleteConnectorError: () => dispatch(clearDeleteConnectorError()),
    clearAddInstanceError: () => dispatch(clearAddInstanceError()),
    clearUpdateInstanceError: () => dispatch(clearUpdateInstanceError()),
    clearDeleteInstanceError: () => dispatch(clearDeleteInstanceError())
  }
}

/*
Connecting the Class
*/
export default connect(mapStateToProps,mapDispatchToProps)(Connectors);
