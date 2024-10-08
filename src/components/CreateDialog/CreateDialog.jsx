import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"

function CreateDialog({createDialogOpen, handleCloseCreate, handleCreateSave, fields, allowedFields, handleCreateChange, text}) {
  return (
      <>

            <Dialog open={createDialogOpen} onClose={handleCloseCreate}>
              <DialogTitle>{ text}</DialogTitle>
                <DialogContent>
                     {Object.keys(fields || {})
                        .filter((field) => allowedFields.includes(field)) 
                        .map((field) => (
                            <TextField
                            key={field}
                            margin="dense"
                            label={field.charAt(0).toUpperCase() + field.slice(1)} 
                            name={field}
                            value={fields[field]}
                            onChange={(e) => handleCreateChange(e)}
                            fullWidth
                            />
                        ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreate} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateSave} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
      
      </>
  )
}
export default CreateDialog