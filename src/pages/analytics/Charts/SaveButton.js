import React from 'react'
import {Save as SaveIcon} from "@material-ui/icons";
import {Fab as MuiFab, Icon} from "@material-ui/core";
import styled from "styled-components";
import {spacing} from "@material-ui/system";

const Fab = styled(MuiFab)(spacing);


function SaveButton (props) {
    return (
            <Fab mx={2} variant="extended" aria-label="save">
                <Icon component={SaveIcon} />
                Save
            </Fab>
        )

}

export default SaveButton