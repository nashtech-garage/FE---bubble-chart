import { IconButton, Modal, Typography, Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Setting() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (event: any, reason: any) => {
    if (reason && reason === "backdropClick") return;
  };

  return (
    <>
      <IconButton aria-label="export" onClick={handleOpen}>
        <SettingsIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Setting modal
            <IconButton
              sx={{ position: "absolute", right: -5, top: -5 }}
              aria-label="export"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Setting mode
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default Setting;
