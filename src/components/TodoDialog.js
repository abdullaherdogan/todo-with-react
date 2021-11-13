import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
function TodoDialog({ dialogOpen, handleClose, item, todoList }) {
    return (
        <Dialog open={dialogOpen} onClose={() => handleClose(item, todoList)}>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Enter Todo Text"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(item, todoList)}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TodoDialog;
