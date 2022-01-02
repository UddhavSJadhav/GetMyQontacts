import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function SignUp() {
  const [values, setValues] = useState({
    password: "",
    username: "",
    confirmpassword: "",
    showUsername: false,
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShow = (prop) => () => {
    setValues({
      ...values,
      [prop]: !values[prop],
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        sx={{ mb: 3 }}
      />
      <FormControl sx={{ mb: 3 }} variant='outlined' fullWidth>
        <InputLabel htmlFor='outlined-adornment-username'>Username*</InputLabel>
        <OutlinedInput
          id='outlined-adornment-username'
          type={values.showUsername ? "text" : "password"}
          value={values.username}
          onChange={handleChange("username")}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShow("showUsername")}
                onMouseDown={handleMouseDownPassword}
                edge='end'>
                {values.showUsername ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label='Password'
        />
      </FormControl>
      <FormControl sx={{ mb: 3 }} variant='outlined' fullWidth>
        <InputLabel htmlFor='outlined-adornment-password'>Password*</InputLabel>
        <OutlinedInput
          id='outlined-adornment-password'
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShow("showPassword")}
                onMouseDown={handleMouseDownPassword}
                edge='end'>
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label='Password'
        />
      </FormControl>
      <FormControl sx={{ mb: 3 }} variant='outlined' fullWidth>
        <InputLabel htmlFor='outlined-adornment-confirmpassword'>
          Confirm*
        </InputLabel>
        <OutlinedInput
          id='outlined-adornment-confirmpassword'
          type={values.showConfirmPassword ? "text" : "password"}
          value={values.confirmpassword}
          onChange={handleChange("confirmpassword")}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShow("showConfirmPassword")}
                onMouseDown={handleMouseDownPassword}
                edge='end'>
                {values.showConfirmPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          }
          label='Password'
        />
      </FormControl>
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
}
