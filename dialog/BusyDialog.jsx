import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/Progress/CircularProgress';

class BusyDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, isLoading} = this.props;
        return(
            <Dialog classes={{
                paper: classes.busyDialog
                }} open={isLoading}>
                <CircularProgress className={classes.progress} size={100} thickness={4} />
            </Dialog>
        );        
    };
}

BusyDialog.propTypes = {
    open: PropTypes.bool
};

export default BusyDialog;