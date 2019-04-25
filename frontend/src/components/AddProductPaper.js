import React from "react";
import { Paper, TextField, IconButton, Icon} from "@material-ui/core";
import ProductField from "./ProductField";
import { sendNewProduct, uploadFile } from "../services/ApiCall";
import jwt_decode from "jwt-decode";

export default class AddProductPaper extends React.Component {

    handleOnChangeInput = (event) => {

        var fileTypes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png'
          ]          
        var preview = document.querySelector('.preview');
        var input = document.getElementById('fileInput');
        var inputEvent = event.target.files[0];
        console.log("Input: ", input.files[0]);
        console.log("InputEvent: ", inputEvent);

        while(preview.firstChild) {
            preview.removeChild(preview.firstChild);
        }
        
        var curFiles = input.files[0];
        if(validFileType(curFiles)) {
            var image = document.createElement('img');
            image.className = "imagePreview";
            image.src = window.URL.createObjectURL(curFiles);
            // image.height = 187;
    
            preview.appendChild(image);
        }

        function validFileType(file) {
            for(var i = 0; i < fileTypes.length; i++) {
                if(file.type === fileTypes[i]) {
                return true;
                }
            }            
            return false;
        }
        
    }

    handleAddProduct () {
        let name = document.getElementById("name").value;
        let availability = document.getElementById("availability").value;
        let region = document.getElementById("region").value;
        let category = document.getElementById("category").value;
        let price = document.getElementById("price").value;
        let productionDate = document.getElementById("productionDate").value;
        let description = document.getElementById("description").value;
        let sellerId = jwt_decode(localStorage.getItem("jwt")).id;

        const image = new FormData();

        var file = document.getElementById('fileInput').files[0];

        image.append('file', file);
        image.append('name', name);
        image.append('description', description);

        let product = {name: name, availability: availability, region: region, category: category, price: price, productionDate: productionDate, description: description, sellerId: sellerId}
        // Make some checks, then
        
        sendNewProduct(localStorage.getItem("jwt"), product, this.success, this.error, file)
    }

    success = async (response) => {
        if (response.status === 200) {
            console.log("Product and image uploaded successfully!");
        }
    }

    error = async (response) => {
        console.log("Errore nella login: " + response);
    };

    render() {
        return (
            <Paper className="globalFieldsContainer">
                <div className="title">
                    <h4>Product info</h4>
                </div>
                <div className="body">
                    <ProductField name="Name" id= "name" type="text"/>
                    <ProductField name="Availability" id= "availability" type="number"/>
                    <ProductField name="Region" id= "region" type="select"/>
                    <ProductField name="Category" id= "category" type="select"/>
                    <ProductField name="Currency" id= "currency" type="select"/>
                    <ProductField name="Price" id= "price" type="number"/>
                    <ProductField name="Production Date" id= "productionDate" type="date"/>
                    <TextField className="description" id="description"
                    multiline
                    rows={10}
                    rowsMax={10}
                    variant="outlined"
                    label="Description"
                    margin="normal"
                    />
                    <div class="images">
                        <div>
                            <span>Upload photo</span>                   
                            <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="fileInput"
                            type="file"
                            onChange={this.handleOnChangeInput}
                            />
                            <label htmlFor="fileInput">
                                <IconButton component="span" size="small" aria-label="Upload">
                                    <Icon>add_photo_alternate</Icon>
                                </IconButton>
                            </label> 
                        </div>
                        <div class="preview">
                        </div>                        
                    </div>
                    <IconButton className="addButton" component="span" size="large" onClick={this.handleAddProduct.bind(this)}>
                        <Icon>add</Icon>
                    </IconButton>
                </div>
            </Paper>
        );
    }
}