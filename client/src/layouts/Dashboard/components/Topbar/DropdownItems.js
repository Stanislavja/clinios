import React, { useState } from "react";

import { ClickAwayListener, Paper, Popper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "10px 10px",
  },
  subMenus: {
    zIndex: 9999,
  },
  link: {
    color: theme.palette.secondary.main,
    display: "block",
    textDecoration: "none",
    padding: "5px 0",
    "&:last-child": {
      border: "none",
    },
  },

  nav: {
    width: "100%",
    minWidth: "190px",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "3px",
    fontSize: "13px",
    marginTop: "1px",
    "& .MuiListItem-divider": {
      "&:last-child": {
        borderBottom: "none",
      },
    },
  },
  itemWithSubmenus: {
    color: theme.palette.white,
    padding: "16px 15px",
    textDecoration: "none",
  },
}));

// menuItems is an array of object like: {content: "", onClick: function}
export default function DropdownItems({ parentItem, menuItems }) {
  const classes = useStyles();
  // for maintaining open and close state
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className={classes.itemWithSubmenus} /* onMouseOver={handleClick} */
      >
        {parentItem}
        {anchorEl ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />}
      </Button>
      <Popper
        className={classes.subMenus}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        role={undefined}
        transition
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <List component="nav" className={classes.nav}>
              {menuItems.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <ListItem button divider key={i} onClick={handleClose}>
                  <RouterLink
                    to={item.href}
                    className={classes.link}
                    key={item.title}
                  >
                    {item.title}
                  </RouterLink>
                </ListItem>
              ))}
            </List>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
}

// For additional type checking
DropdownItems.propTypes = {
  parentItem: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};
