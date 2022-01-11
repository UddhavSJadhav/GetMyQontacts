import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SignUp from "../Nested Components/SignUp";
import SignIn from "../Nested Components/SignIn";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Utils/AuthAtApp";

const Authentication = () => {
  const [selectBtn, setSelectBtn] = useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate(-1);
  }, []);

  const selectedBtn = {
    width: 150,
    height: 50,
    backgroundColor: "white",
    opacity: [0.9, 0.8, 0.7],
    borderRight: 1,
    borderLeft: 1,
    borderColor: "white",
    borderRadius: 5,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "white",
      opacity: [0.9, 0.8, 0.7],
    },
  };
  const unselectedBtn = {
    width: 150,
    height: 50,
    backgroundColor: "primary.dark",
    color: "white",
    borderRadius: 5,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "primary.main",
      opacity: [0.9, 0.8, 0.7],
    },
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Box
          sx={{
            width: 300,
            backgroundColor: "primary.dark",
            borderRadius: 5,
            mb: 2,
          }}>
          <Grid>
            <Button
              variant='extended'
              sx={selectBtn ? selectedBtn : unselectedBtn}
              onClick={() => {
                setSelectBtn(true);
              }}>
              SignIn
            </Button>
            <Button
              variant='extended'
              sx={selectBtn ? unselectedBtn : selectedBtn}
              onClick={() => {
                setSelectBtn(false);
              }}>
              SignUp
            </Button>
          </Grid>
        </Box>
        {selectBtn ? <SignIn /> : <SignUp />}
      </Box>
    </Container>
  );
};
export default Authentication;
