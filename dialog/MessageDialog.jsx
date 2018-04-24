import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import history from '../history';

class MessageDialog extends Component {
    constructor(props) {
        super(props);
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
                    {this.props.title}
                </DialogTitle>
                <DialogContent>
                    <h3>{this.props.value}</h3>
                </DialogContent>
                <DialogActions>
                {
                    this.props.btns.map((btn, i) =>
                        <Button key={i} onClick={btn.event} variant="raised" color="primary">
                            {btn.text}
                        </Button>
                    )
                }                    
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