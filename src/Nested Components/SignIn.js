import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { UserContext } from "../Utils/AuthAtApp";
import ResetPasswordModel from "./ResetPasswordModal";
import { API } from "../API.js";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.target);
    const loginData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    axios
      .post(`${API}/authentication/signin`, loginData)
      .then((res) => {
        setUser(res.data);
        setErrors({});
        localStorage.setItem("userToken", res.data.token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
    setLoading(false);
  };

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin='normal'
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        autoComplete='email'
        helperText={errors.email}
        error={errors.email ? true : false}
        autoFocus
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='password'
        label='Password'
        type='password'
        id='password'
        helperText={errors.password}
        error={errors.password ? true : false}
        autoComplete='current-password'
      />
      <Button
        type='submit'
        fullWidth
        variant='contained'
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}>
        Sign In
      </Button>
      <Grid sx={{ textAlign: "center" }}>
        <Link href='#' onClick={() => setResetPassword(true)} variant='body2'>
          Forgot password?
        </Link>
      </Grid>
      <ResetPasswordModel
        ResetPasswordProp={{ resetPassword, setResetPassword }}
      />
    </Box>
  );
}
