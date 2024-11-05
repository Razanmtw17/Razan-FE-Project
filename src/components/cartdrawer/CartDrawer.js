import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
export default function CartDrawer({ isOpen, onClose }) {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 300,
          backgroundColor: "white",
          color: "black",
        },
      }}
    >
      <div role="presentation" onClick={onClose} onKeyDown={onClose}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
        <List>
          {["Shopping cart", "Item 2", "Item 3"].map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <button className="cartbutton">ADD&nbsp;TO&nbsp;CART</button>
      </div>
    </Drawer>
  );
}
