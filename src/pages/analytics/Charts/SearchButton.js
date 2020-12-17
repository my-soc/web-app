import React from 'react'
import {Search as SearchIcon} from "@material-ui/icons";
import {Fab as MuiFab, Icon} from "@material-ui/core";

function SearchButton (props) {
    return (
            <MuiFab mx={2} onClick={props.search} color="primary" variant="extended" aria-label="search">
                <Icon component={SearchIcon} />
                Search
            </MuiFab>
        )

}

export default SearchButton