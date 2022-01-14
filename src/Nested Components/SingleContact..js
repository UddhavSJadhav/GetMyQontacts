import { Card, CardContent, Fab, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { DeleteModalContext, EditModalContext } from "../Utils/ModalContext";

const SingleContact = (props) => {
  const [contact, setContact] = useState(props.data);
  const [deleted, setDeleted] = useState({ display: "block" });
  const { deleteModal, setDeleteModal } = useContext(DeleteModalContext);
  const { editModal, setEditModal } = useContext(EditModalContext);
  useEffect(() => {
    if (deleteModal.deleted === contact) setDeleted({ display: "none" });
  }, [deleteModal]);
  useEffect(() => {
    if (editModal.updated === contact) setContact(editModal.newData);
  }, [editModal]);
  return (
    <Grid item xs={12} sm={6} md={4} sx={deleted}>
      <Card sx={{ position: "relative" }}>
        <CardContent>
          <Typography variant='h5' component='div'>
            {contact.contact_name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {contact.mobile_number}
          </Typography>
          <DeleteForeverRoundedIcon
            onClick={() => setDeleteModal({ data: contact, deleted: {} })}
            sx={{
              color: "#ba000d",
              position: "absolute",
              top: 1,
              right: 1,
            }}></DeleteForeverRoundedIcon>
          <Fab
            onClick={() =>
              setEditModal({ data: contact, newData: "", updated: {} })
            }
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
    </Grid>
  );
};

export default SingleContact;
