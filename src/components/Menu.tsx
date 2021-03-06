import React, { MouseEventHandler } from "react";
import clsx from 'clsx';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import Drawer from "@material-ui/core/Drawer";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuItem, { MenuItemProps } from "./MenuItem";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
}));

interface MenuProps {
  handleDrawerClose: MouseEventHandler;
  open: boolean;
}

export default function Menu(props: MenuProps) {
  const topItems: MenuItemProps[] = [
    {
      icon: 'calendar_today',
      text: "Calendar",
      url: "/",
    },
    {
      icon: 'restaurant',
      text: "Meals",
      url: "/meals",
    },
    {
      icon: 'event_available',
      text: "Meal Calendar Setup",
      url: "/meal-calendar",
    },
  ];
  const bottomItems: MenuItemProps[] = [
    {
      icon: 'settings',
      text: "Settings",
      url: "/profile",

    }
  ]
  const classes = useStyles();
  const theme = useTheme();
  const { handleDrawerClose, open } = props;
  return (
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {
            topItems.map((menuItem) => ( <MenuItem {...menuItem} key={menuItem.text}/>))
          }
        </List>
        <Divider />
        <List>
          {
            bottomItems.map((menuItem) => ( <MenuItem {...menuItem} key={menuItem.text}/>))
          }
        </List>
      </Drawer>
  )
} 