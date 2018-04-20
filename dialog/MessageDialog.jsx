import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

class MessageDialog extends Component {
    constructor(props) {
        super(props);
        this.handleOk = this.handleOk.bind(this);
    }

    handleOk(){
        //this.props.history.push("");
        this.props.handleMsgDlgOpen(false);
        this.props.handleMsgDlgValue("");
    }

    render() {

        return(
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                aria-labelledby="confirmation-dialog-title"
                open={this.props.open}>
                <DialogTitle id="confirmation-dialog-title">
                    Success
                </DialogTitle>
                <DialogContent>
                    <h3>{this.props.value}</h3>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleOk} variant="raised" color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );        
    };
}

MessageDialog.propTypes = {
    open: PropTypes.bool,
    value: PropTypes.string
};

export default MessageDialog;