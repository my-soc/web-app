import React from 'react'
import {connect} from "react-redux"
import Helmet from "react-helmet"
import styled, { createGlobalStyle } from "styled-components"
import { spacing } from "@material-ui/system"
import {
    CssBaseline,
    Grid,
    LinearProgress,
    Paper as MuiPaper,
    withWidth,
} from "@material-ui/core"
import {Alert} from "@material-ui/lab"
import { isWidthUp } from "@material-ui/core/withWidth"
import {
    deleteEntry,
    getEntries,
    postEntry,
    clearGetEntriesError,
    clearPostEntryError,
    clearDeleteEntryError
} from "../../redux/actions"

import Entry from "./Entry"
import Cli from "./Cli"

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%
  }

  body {
    background: ${props => props.theme.body.background};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

const Root = styled.div`
  display: flex;
  min-height: 80vh;


`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;


`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${props => props.theme.body.background};
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  };

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  };
  overflow: auto;
  max-height: 78vh
`;

class Notebook extends React.Component {

    componentDidMount = () =>{
        this.props.getEntries()
    }

    testPost=(entry)=> {
        console.log(entry)
    }
    render(){
        let entries = (
            this.props.entriesState.loading?
                <LinearProgress />
                :this.props.entriesState.errors.getEntriesError?
                    <Alert variant="filled" severity="error" onClose={this.props.clearGetEntriesError}>
                        Failed to fetch the Entries!
                    </Alert>
                :this.props.entriesState.errors.postEntryError?
                    <Alert variant="filled" severity="error" onClose={this.props.clearPostEntryError}>
                        Failed to post this Entry!
                    </Alert>
                :this.props.entriesState.errors.deleteEntryError?
                    <Alert variant="filled" severity="error" onClose={this.props.clearDeleteEntryError}>
                        Failed to delete this Entry!
                    </Alert>
                :this.props.entriesState.entries?
                    <Grid container spacing={6}>
                        {this.props.entriesState.entries.map(entry => {
                            return (
                                <Grid item xs={12} lg={6} xl={12} key={entry.id}>
                                    <Entry
                                        entryID={entry.id}
                                        entryContent={entry.content}
                                        entryCommand={entry.command}
                                        deleteEntry={this.props.deleteEntry}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                    :null
        )
        return (
            <Root>
                <CssBaseline />
                <GlobalStyle />
                <AppContent>
                    <Helmet title="Notebook" />
                    <MainContent p={isWidthUp("lg", this.props.width) ? 10 : 5}>
                        {entries}
                    </MainContent>
                            <Cli
                                postEntry={this.props.postEntry}
                            />
                </AppContent>

            </Root>
        )
    }
}

const mapStateToProps = (store) => {
    return ({
        entriesState: store.notebookReducer
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEntries: () => dispatch(getEntries()),
        postEntry: (entry) => dispatch(postEntry(entry)),
        deleteEntry: (entry) => dispatch(deleteEntry(entry)),
        clearGetEntriesError: () => dispatch(clearGetEntriesError()),
        clearPostEntryError: () => dispatch(clearPostEntryError()),
        clearDeleteEntryError: () => dispatch(clearDeleteEntryError())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withWidth()(Notebook));
