import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export default function EditProfileDialog() {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Edit Profile</DialogTitle>
      <DialogContent>
        <DialogContentText>Edit your profile here</DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
