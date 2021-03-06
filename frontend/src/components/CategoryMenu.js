import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },
    image: {
      position: 'relative',
      height: 200,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  });
  
  const images = [
    {
      url: 'https://www.dhresource.com/webp/m/0x0s/f2-albu-g6-M01-58-61-rBVaSFpUcCyABUUOAAOKDnUkkHE588.jpg/50-pcs-bromeliad-seeds-vegetable-and-fruit-garden-succulent-plants-mini-cactus-pots-cheap-rainbow-children-bonsai-flower-seeds.jpg',
      title: 'Vegetables',
      width: '33.3%',
    },
    {
      url: 'http://www.kasaisushi.it/wp-content/uploads/2017/11/FRUTTA-DI-STAGIONE.jpg',
      title: 'Fruits',
      width: '33.3%',
    },
    {
      url: 'http://www.aziendaorlando.it/wp-content/uploads/2016/11/verdure.jpg',
      title: 'vegetables',
      width: '33.3%',
    },
  ];

 
  
  function ButtonBases(props) {
    const { classes } = props;

   const handlerClcik = () => {

    }
    return (
      <div className={classes.root}>
        {images.map(image => (
          <ButtonBase
            href="/product" 
            focusRipple
            onClick= {handlerClcik}
            key={image.title}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width,
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase >
        ))}
      </div>
    );
  }
  
  ButtonBases.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ButtonBases);