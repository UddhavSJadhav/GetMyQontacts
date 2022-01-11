import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UserContext } from "../Utils/AuthAtApp";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
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
    setLoading(true);
    const data = new FormData(event.target);
    const signupData = {
      email: data.get("email"),
      password: values.password,
      username: values.username,
      confirmpassword: values.confirmpassword,
    };
    axios
      .post("http://localhost:5000/authentication/signup", signupData)
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
    <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        required
        fullWidth
        id='email'
        label='Email Address'
        name='email'
        helperText={errors.email}
        error={errors.email ? true : false}
        sx={{ mb: 3 }}
      />
      <FormControl sx={{ mb: 3 }} variant='outlined' fullWidth>
        <InputLabel htmlFor='outlined-adornment-username'>Username*</InputLabel>
        <OutlinedInput
          id='outlined-adornment-username'
          type={values.showUsername ? "text" : "password"}
          value={values.username}
          onChange={handleChange("username")}
          error={errors.username ? true : false}
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
        {errors.username && (
          <FormHelperText error id='cp-error'>
            {errors.username}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl sx={{ mb: 3 }} variant='outlined' fullWidth>
        <InputLabel htmlFor='outlined-adornment-password'>Password*</InputLabel>
        <OutlinedInput
          id='outlined-adornment-password'
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          error={errors.password ? true : false}
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
        {errors.password && (
          <FormHelperText error id='cp-error'>
            {errors.password}
          </FormHelperText>
        )}
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
          error={errors.confirmpassword ? true : false}
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
        {errors.confirmpassword && (
          <FormHelperText error id='cp-error'>
            {errors.confirmpassword}
          </FormHelperText>
        )}
      </FormControl>
      <Button
        type='submit'
        fullWidth
        variant='contained'
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}>
        Sign Up
      </Button>
    </Box>
  );
}
