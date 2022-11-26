import { Box, Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { API } from "../API.js";

const DeleteModal = (props) => {
  const { deleteModal, setDeleteModal, user } = props.deleteModalProp;
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "#99e4ee",
    border: "2px solid #03a9f4",
    p: 4,
  };
  const handleDelete = () => {
    axios
      .post(`${API}/contacts/deletecontact`, {
        contact: deleteModal.data,
        token: user.token,
      })
      .then((res) => {
        setDeleteModal({ data: "", deleted: deleteModal.data });
      })
      .catch((err) => {
        //nothing
      });
    setDeleteModal({ data: "", deleted: {} });
  };
  return (
    <Modal
      open={deleteModal.data ? true : false}
      onClose={() => setDeleteModal({ data: "", deleted: {} })}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={modalStyle}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Are you Sure?
        </Typography>
        <Button onClick={handleDelete}>Delete</Button>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
