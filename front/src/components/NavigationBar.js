import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from '@material-ui/core/List'
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
// import {Link} from "react-router-dom";
import Link from '@material-ui/core/Link';


export default function NavigationBar() {
    const drawerElements = [
        {text: "Expenses", link: "/expense"},
        {text: "Expense Types", link: "/expense_type"},
        {text: "Analytics", link: "/analytics"},
    ]

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        left: false
    });
    const anchor = 'left';

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton
                    edge="start"
                    color="inherit"
                    sx={{mr: 2}}
                    onClick={toggleDrawer(anchor, true)}>
                    <MenuIcon/>
                </IconButton>
                <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                >
                    <List>
                        {drawerElements.map((element, index) => (
                            <ListItem button key={index}>
                                <Link href={element.link} underline="none">
                                    <ListItemText primary={element.text} />
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Typography variant="h6" color="inherit" component="div">
                    Expenses Tracker
                </Typography>
            </Toolbar>
        </AppBar>
    )
}