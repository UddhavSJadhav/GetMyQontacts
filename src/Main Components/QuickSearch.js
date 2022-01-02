import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const QuickSearch = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("username"),
      password: data.get("contact-name"),
    });
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
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='contact-name'
            label='Contact Name'
            type='text'
            id='contact-name'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Search
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default QuickSearch;
