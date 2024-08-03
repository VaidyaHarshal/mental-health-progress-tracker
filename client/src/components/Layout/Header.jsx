import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const HeaderContainer = styled(Box)({
  flexGrow: 1,
});

const Header = () => {
  return (
    <HeaderContainer>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Mental Health Progress Tracker
          </Typography>
        </Toolbar>
      </AppBar>
    </HeaderContainer>
  );
};

export default Header;
