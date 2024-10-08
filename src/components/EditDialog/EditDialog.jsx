import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"

function EditDialog({editDialogOpen, handleCloseEdit, handleEditSave, fields, allowedFields, handleFieldChange, text}) {
  return (
      <>
         <Dialog open={editDialogOpen} onClose={handleCloseEdit}>
        <DialogTitle>{ text}</DialogTitle>
        <DialogContent>
           {Object.keys(fields)
          .filter((field) => allowedFields.includes(field))  
          .map((field) => (
            <TextField
              key={field}
              margin="dense"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={fields[field]}
              onChange={(e) => handleFieldChange(e)}
              fullWidth
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">Cancel</Button>
          <Button onClick={handleEditSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      </>
  )
}
export default EditDialog