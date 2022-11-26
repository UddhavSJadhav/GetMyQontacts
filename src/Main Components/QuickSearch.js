import {
  Box,
  Button,
  CardContent,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { API } from "../API.js";

const QuickSearch = () => {
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState();
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.target);
    const getQuickContact = {
      username: data.get("username"),
      contact_name: data.get("contact_name"),
    };
    axios
      .post(`${API}/contacts/getquickcontact`, getQuickContact)
      .then((res) => {
        setContact(res.data.contact);
        setErrors({});
      })
      .catch((err) => {
        setContact({});
        if (err.response) setErrors(err.response.data);
      });
    setLoading(false);
  };

  return (
    <Container component='main' onSubmit={handleSubmit} maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography sx={{ fontSize: 30, color: "#2196f3" }}>
          Quick Search
        </Typography>
        <Box component='form' noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            helperText={errors.username}
            error={errors.username ? true : false}
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='contact_name'
            label='Contact Name'
            type='text'
            helperText={errors.contact_name}
            error={errors.contact_name ? true : false}
            id='contact_name'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}>
            {loading ? "Searching" : "Search"}
          </Button>
        </Box>
        <CardContent
          sx={
            contact ? { width: "100%", display: "block" } : { display: "none" }
          }>
          <Typography variant='h5' component='div'>
            {contact ? contact.contact_name : null}
            {errors ? errors.error : null}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {contact ? contact.mobile_number : null}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {contact ? contact.message : null}
          </Typography>
        </CardContent>
      </Box>
    </Container>
  );
};

export default QuickSearch;
