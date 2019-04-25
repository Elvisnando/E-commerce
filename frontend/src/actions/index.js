export function PopulateProductsList(list){
    console.log('POPULATE', list);
    return {
        type: 'POP_PROD_LIST',
        payload: list
    }
}

export function PopulateImagesList(list){
    return {
        type: 'POP_IMAGES_LIST',
        payload: list
    }
}

export function ResetImagesList(){
    return {
        type: 'RESET_IMAGES_LIST'
    }
}

export const loginSuccess = (payload) => {
    return {
        type: 'LOGIN_SUCCESSFULL',
        payload: payload
    }
}

export const toggleToken = () => {
    return {
        type: 'LOGOUT'        
    }
}

export const saveTextToSearch = (payload) => {
    return {
        type: 'SAVE_TEXT_TO_SEARCH',
        payload: payload     
    }
}

export const saveProductsInCart = (payload) => {
    return {
        type: 'SAVE_PRODUCTS_IN_CART',
        payload: payload     
    }
}

export const saveRegInProduc = (payload) => {
    return {
        type: 'SAVE_REG_IN_PRODUCT',
        payload: payload     
    }
}