import React, { Component } from "react"
import history from '../services/History';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"
import ReactTooltip from "react-tooltip"
import myData from './italy-regions.json';
import {connect} from 'react-redux';
import {saveRegInProduc} from '../actions/index';

const wrapperStyles = {
  width: "70%", //LA
  height: "70%"//AL
  
}

class CountryMap extends Component {
  constructor(props){
    super();
  }
  
  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 100)
  }

  handlerClick = (id) => {
     
    console.log("click");
    this.props.saveRegInProduc(id);
    history.push('/product');
    
    //this.props.history.push('/Chart');
}
  render() {
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            scale: 11000,
          }}
          width={2900}//larghezza
          height={2200}//altezza
          style={{
            width: "100%",
            height: "100%"
          }}
          >
          
          <ZoomableGroup center={[13.2, 41.8]} disablePanning>
            <Geographies geography={myData}>
              {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                <Geography
                  key={i}
                  data-tip={geography.properties.NAME_1}
                  geography={geography}
                  projection={projection}
                  onClick={() => this.handlerClick(geography.properties.NAME_1)}
                  style={{
                    default: {
                      fill: "#ECEFF1",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    hover: {
                      fill: "#607D8B",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    pressed: {
                      fill: "#FF5722",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                  }}
                />
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <ReactTooltip />
      </div>
    )
  }
}

const mapStateToProps = ({ products }) => {
  return {
      products
  }
}

export default connect(mapStateToProps, {saveRegInProduc}) (CountryMap)