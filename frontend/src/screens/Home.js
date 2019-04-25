import React from "react";
import "../styles/util.css"
import SearchBar from "../components/SearchBar";
import CarouselCustomer from "../components/CarouselCustomer";
import CategoryMenu from "../components/CategoryMenu"
import GridListProduct from "../components/GridListProduct"
import CountryMap from '../components/CountryMap';

const Home = () => {
  
    return (
        <div>
            <div className="centerCarouselCustomer">
                <CarouselCustomer/>                
            </div>
            <div className="searchBarHomeDiv">
                <SearchBar className="centerSearch"/>
            </div>
            <div className = "centerCategory">
                <CategoryMenu/>
            </div>
            <div>
                <CountryMap />
            </div>
            
            
        </div>            
);
};

export default Home;