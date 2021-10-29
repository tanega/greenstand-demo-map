import { FC, useEffect, useState } from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import { Button, Typography } from "@mui/material";
import Image from "next/image";

const StyledPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  position: "absolute",
  textAlign: "center",
  right: " 5px",
  top: "5px",
  width: "30%",
  color: theme.palette.text.secondary,
  lineHeight: "60px",
  overflow: "hidden",
}));

export interface SidePopperProps {
  on: boolean;
  handleClose: () => void;
  info: any;
}

const SidePopper: FC<SidePopperProps> = ({ on, handleClose, info }) => {
  useEffect(() => {
    console.log(on);
    console.log(info);
  }, [on, info]);
  return (
    <Slide direction="left" in={on}>
      <StyledPaper elevation={6}>
        {info && (
          <Box style={{ overflow: "hidden" }}>
            <img
              alt={`tree-${info.properties.id}`}
              src={info.properties.image_url}
              style={{
                objectFit: "cover",
                height: "500px",
                width: "100%",
                overflow: "hidden",
              }}
            />
            <Typography variant="body1" component="div">
              {info.properties.organization}
            </Typography>
          </Box>
        )}
        <Button onClick={handleClose}>Close</Button>
      </StyledPaper>
    </Slide>
  );
};

export default SidePopper;
