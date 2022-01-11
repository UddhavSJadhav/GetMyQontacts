import {
  Button,
  Card,
  CardContent,
  Fab,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import axios from "axios";
import { Box } from "@mui/system";

const SingleContact = (props) => {
  const [deleted, setDeleted] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const contact = props.data;
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#99e4ee",
    border: "2px solid #000",
    p: 4,
  };

  const handleDelete = () => {
    axios
      .post("", contact)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => {
        //nothing
      });
    setOpenDelete(false);
  };
  const handleEdit = () => {
    console.log("fghfg");
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      sx={deleted ? { display: "none" } : { display: "block" }}>
      <Card sx={{ position: "relative" }}>
        <CardContent>
          <Typography variant='h5' component='div'>
            {contact.contact_name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {contact.mobile_number}
          </Typography>
          <DeleteForeverRoundedIcon
            onClick={() => setOpenDelete(true)}
            sx={{
              color: "#ba000d",
              position: "absolute",
              top: 1,
              right: 1,
            }}></DeleteForeverRoundedIcon>
          <Fab
            onClick={() => setOpenEdit(true)}
            size='small'
            aria-label='edit'
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              color: "#03a9f4",
            }}>
            <EditRoundedIcon></EditRoundedIcon>
          </Fab>
        </CardContent>
      </Card>
      <Modal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={modalStyle}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Are you Sure?
          </Typography>
          <Button onClick={handleDelete}>Delete</Button>
        </Box>
      </Modal>
      <Modal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={modalStyle}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Are you Sure?
          </Typography>
          <Button onClick={handleEdit}>Delete</Button>
        </Box>
      </Modal>
    </Grid>
  );
};

export default SingleContact;
