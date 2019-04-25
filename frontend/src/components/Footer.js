import React, { Component } from "react";
import '../styles/style.css';
import '../styles/util.css';
import 'font-awesome/css/font-awesome.min.css'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    footerIcon: {
        display: 'flex',
        justifyContent: 'center',
    }
})

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
    };
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  render() {
      const { classes } = this.props;
    return (
      <div id="footer" className="footer">
        <div className="footerChild">
          <a href="url">About Us</a>
        </div>
        <div className="footerChildTitle">
          <a>COUNTRY SHOP</a>
        </div>
        <div className="footerChild">
          <ul>
            <li><a href="http://youtube.com" class="fa fa-youtube"></a></li>
            <li><a href="http://facebook.com" class="fa fa-facebook"></a></li>
            <li><a href="http://instagram.com" class="fa fa-camera-retro"></a></li>
            <li><a href="http://twitter.com" class="fa fa-twitter"></a></li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      isLogged: state.logged,
      token: state.token
  }
}

export default withStyles(styles)(Footer);
// export default connect(mapStateToProps,{loginSuccess}) (Footer);
