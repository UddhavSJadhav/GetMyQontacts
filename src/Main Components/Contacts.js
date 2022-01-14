import { Box, Container, CssBaseline, Fab, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../Nested Components/DeleteModal";
import EditModal from "../Nested Components/EditModal";
import SingleContact from "../Nested Components/SingleContact.";
import { UserContext } from "../Utils/AuthAtApp";
import { DeleteModalContext, EditModalContext } from "../Utils/ModalContext";
import AddIcon from "@mui/icons-material/Add";
import AddModal from "../Nested Components/AddModal";

const Contacts = () => {
  let i = 0;
  const { user } = useContext(UserContext);
  const [contacts, setContacts] = useState([]);
  const { deleteModal, setDeleteModal } = useContext(DeleteModalContext);
  const { editModal, setEditModal } = useContext(EditModalContext);
  const [addNewContact, setAddNewContact] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) return navigate(-1);
    axios
      .post("http://localhost:5000/contacts/getcontacts", { token: user.token })
      .then((res) => {
        setContacts(res.data.contacts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container sx={{ mt: 3 }}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {contacts.map((contact) => {
            i++;
            return <SingleContact data={contact} key={i} />;
          })}
        </Grid>
        <DeleteModal deleteModalProp={{ deleteModal, setDeleteModal, user }} />
        <EditModal editModalProp={{ editModal, setEditModal, user }} />
        <AddModal
          addModalProp={{
            user,
            addNewContact,
            setAddNewContact,
            contacts,
            setContacts,
          }}
        />
        <Fab
          color='primary'
          aria-label='add'
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
          }}>
          <AddIcon onClick={() => setAddNewContact(!addNewContact)} />
        </Fab>
      </Box>
    </Container>
  );
};

export default Contacts;
