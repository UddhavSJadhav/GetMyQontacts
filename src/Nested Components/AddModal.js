import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const AddModal = (props) => {
  const {
    user,
    addNewContact,
    setAddNewContact,
    contacts,
    setContacts,
  } = props.addModalProp;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    contact_name: "",
    mobile_number: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#99e4ee",
    border: "2px solid #03a9f4",
    p: 4,
  };
  const handleEdit = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.target);
    const newContact = {
      contact_name: data.get("contact_name"),
      mobile_number: data.get("mobile_number"),
      token: user.token,
    };
    axios
      .post("http://localhost:5000/contacts/postcontact", newContact)
      .then((res) => {
        setContacts([
          {
            contact_name: data.get("contact_name"),
            mobile_number: data.get("mobile_number"),
          },
          ...contacts,
        ]);
        setErrors({});
        setAddNewContact(false);
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
    setLoading(false);
  };
  return (
    <Modal
      open={addNewContact}
      onClose={() => {
        setAddNewContact(false);
        setErrors({});
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box component='form' onSubmit={handleEdit} noValidate sx={modalStyle}>
        <TextField
          value={values.contact_name}
          onChange={handleChange("contact_name")}
          margin='normal'
          required
          fullWidth
          id='contact_name'
          label='Contact Name'
          name='contact_name'
          helperText={errors.contact_name}
          error={errors.contact_name ? true : false}
          autoFocus
        />
        <TextField
          value={values.mobile_number}
          onChange={handleChange("mobile_number")}
          margin='normal'
          required
          fullWidth
          name='mobile_number'
          label='Mobile Number'
          id='mobile_number'
          helperText={errors.mobile_number}
          error={errors.mobile_number ? true : false}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}>
          Add New Contact
        </Button>
      </Box>
    </Modal>
  );
};

export default AddModal;
