import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import history from '../history';

class MessageDialog extends Component {
    constructor(props) {
        super(props);
    }    

    render() {
        const { classes } = this.props;

        return(
            <Dialog
                classes={{
                    paper: classes.dlgMsg
                }}
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                open={this.props.open}>
                <DialogTitle id="alert-dialog-title">
                    <span 
                        className={this.props.title === "Success" ? 
                                    classes.dlgTitSuccess: 
                                    (this.props.title === "Error" ? 
                                    classes.dlgTitError : 
                                    classes.dlgTitWarning )}
                    >
                        {this.props.title}
                    </span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.value}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                {
                    this.props.btns.map((btn, i) =>
                        <Button key={i} onClick={btn.event} color="primary">
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