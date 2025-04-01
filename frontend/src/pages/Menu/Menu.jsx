import React from "react";
import "./Menu.css";
import { menuitems } from "../../assets/assets";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Menu = () => {
  return (
    <Container className="menu-container">
      <h1 id="menu-title">Menu</h1>
      <div className="menu-gallery">
        {Object.keys(menuitems).map((key) => (
          <Card sx={{ maxWidth: 345, borderRadius: "15px" }} key={key}>
            <CardMedia
              component="img"
              height="194"
              image={menuitems[key].image}
            />
            <CardContent>
              <Typography variant="body2">
                {menuitems[key].description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Menu;
