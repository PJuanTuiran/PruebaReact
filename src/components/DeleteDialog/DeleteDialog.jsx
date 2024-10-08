import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

function DeleteDialog({deleteDialogOpen, handleCloseDelete, handleDelete}) {
  return (
      <>
        {/* Dialog para eliminar */}
      <Dialog open={deleteDialogOpen } onClose={handleCloseDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
      </>
  )
}
export default DeleteDialog