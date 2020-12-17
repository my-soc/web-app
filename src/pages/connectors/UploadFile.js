import React from "react";

import {
    Fab
} from "@material-ui/core";

import { DropzoneDialog } from 'material-ui-dropzone'

import {Publish as UploadIcon} from "@material-ui/icons";


const UploadFile = (props) => {

    const handleUpload = () => {
        props.clickUpload()
    }
    const handleSave = (files) => {
        props.clickSave(files)

    }
    const handleClose = () => {
        props.clickClose()
    }

    return (
        <React.Fragment>
                <Fab color="primary" aria-label="upload" onClick={handleUpload} >
                    <UploadIcon />
                </Fab>
                <DropzoneDialog
                    open={props.open}
                    onSave={handleSave}
                    onClose={handleClose}
                    dropzoneText ={props.dropzoneText}
                    acceptedFiles={props.acceptedFiles}
                    maxFileSize={props.maxFileSize}
                    showPreviews={props.showPreviews}
                />

        </React.Fragment>
    );
}

export default UploadFile