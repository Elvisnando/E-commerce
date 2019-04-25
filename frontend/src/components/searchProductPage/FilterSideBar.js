import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterContent from './FilterContent';


const styles = theme => ({
  filter: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },

});

function FilterSideBar(props) {
  const { classes } = props;
  return (
    <div className="FilterSideBarContainer">
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Product Research Filters</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <FilterContent />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

FilterSideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterSideBar);