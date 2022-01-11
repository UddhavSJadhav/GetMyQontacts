import { Box, Container, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SingleContact from "../Nested Components/SingleContact.";
import { UserContext } from "../Utils/AuthAtApp";

const Contacts = () => {
  const { user } = useContext(UserContext);
  const [contacts, setContacts] = useState([]);
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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {contacts.map((contact) => {
            return <SingleContact data={contact} key={contact.contact_name} />;
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default Contacts;
