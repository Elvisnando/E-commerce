
import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import jwt_decode from "jwt-decode";
import { Drawer, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
  // zIndex: theme.zIndex.drawer + 1,
  },
  list: {
    width: 250,
},
fullList: {
    width: 'auto',
},
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
  },
});

class SideBar extends Component {
    render () {
      
        const { classes } = this.props;        
        const sideBarList = [];

        
        
        
        if (localStorage.getItem("jwt") !== null) {          
          const token = jwt_decode(localStorage.getItem("jwt"));
          token.isMerchant && sideBarList.push("Merchant");
          token.isRestaurant && sideBarList.push("Restaurant");
          token.isProducer && sideBarList.push("Producer");
        }

        return (
        
            <Drawer anchor="right" open={this.props.open} onClose={this.props.handleDrawerClose}>
                <div className="sideBar">
                  <div className={classes.drawerHeader}>
                    <IconButton onClick={this.props.handleDrawerClose}>
                      <ChevronLeftIcon/>
                    </IconButton>
                  </div>
                  <Divider />
                  <List>
                    <ListItem button={true} component="a" href="/profile" key={0} >
                        <ListItemText>Account</ListItemText>
                    </ListItem>                            
                </List>
                <Divider />
                <List>
                {sideBarList.map(key => (
                    <ListItem button component="a" href="/insertproduct"  >
                        <ListItemText primary={key}/>
                    </ListItem>)
                    )
                }
                </List>
                <Divider />
                <List>
                    <ListItem button={true} component="a" key={0} onClick={this.props.handleLogout} >
                        <ListItemText>Logout</ListItemText>
                    </ListItem>                            
                </List>
                </div>
              </Drawer>            
        )
    }
}

SideBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
  
  export default withStyles(styles)(SideBar);