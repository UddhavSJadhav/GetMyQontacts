import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { API } from "../API.js";

const ResetPasswordModel = (props) => {
  const { resetPassword, setResetPassword } = props.ResetPasswordProp;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    width: "100%",
    bgcolor: "#99e4ee",
    border: "2px solid #03a9f4",
    p: 4,
  };
  const handleEdit2 = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.target);
    const resetBody = {
      email: data.get("email"),
    };
    axios
      .post(`${API}/authentication/resetpassword`, resetBody)
      .then((res) => {
        console.log(res);
        setErrors({});
      })
      .catch((err) => {
        if (err.response.data) {
          setErrors(err.response.data);
        } else {
          setErrors({ email: "Unregistered email" });
        }
      });
    setLoading(false);
  };
  return (
    <Modal
      open={resetPassword}
      onClose={() => {
        setResetPassword(false);
        setErrors({});
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box component='form' onSubmit={handleEdit2} noValidate sx={modalStyle}>
        <TextField
          value={values.email}
          onChange={handleChange("email")}
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email'
          name='email'
          helperText={errors.email}
          error={errors.email ? true : false}
          autoFocus
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}>
          Reset Password
        </Button>
      </Box>
    </Modal>
  );
};

export default ResetPasswordModel;
