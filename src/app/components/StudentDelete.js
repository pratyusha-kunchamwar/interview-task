import React from "react";
import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";

const StudentDelete = ({ open, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Are you sure you want to delete this student?</DialogTitle>
      <DialogActions>
        <Button onClick={onCancel} color="primary" variant="contained">
          No
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentDelete;
