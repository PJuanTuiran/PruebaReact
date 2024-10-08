"use client";

import { Box, Button } from "@mui/material"

function CreateButton({handleCloseCreate, text}) {
  return (
    <Box>
          <Button variant="contained" color="primary" onClick={handleCloseCreate}>{text }</Button>
    </Box>
  )
}
export default CreateButton 