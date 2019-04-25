import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {connect} from 'react-redux';
import axios from 'axios';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});


class  SingleLineGridList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pr: [],
    }
 }
 componentWillMount() {
  axios.get('/admin/listProducts')
    .then(res => {
      const product = res.data;
      this.setState({pr: product});
    })
}

  render() {
  const { classes } = this.props;
  console.log(this.state.pr);
  this.state.pr.map(p => (
    console.log(p.name)
  ) );

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={4}>
        {this.state.pr.map(pr => (
          <GridListTile className={classes.root}>
            <img src="https://media.adhocash.it/blog/1/112/b.jpg" alt={pr.name} />
            <GridListTileBar
              title={pr.name}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default  withStyles(styles)(SingleLineGridList);