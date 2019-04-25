const defaultState = {
  productsList: [],
  textToSearch: '',
  productsInCart: [],
  images: [],
  Reg: ''
}

export default (state=defaultState, action) => {

    let payload = action.payload;
    switch (action.type) {
      case 'POP_PROD_LIST':
        return { ...state, productsList: payload };
      case 'POP_IMAGES_LIST':
        return { ...state, images: [...state.images, payload] };
      case 'RESET_IMAGES_LIST':
        return { ...state, images: [] };  
      case 'SAVE_TEXT_TO_SEARCH':
        return { ...state, textToSearch: payload };
      case 'SAVE_PRODUCTS_IN_CART':
        return { ...state, productsInCart: payload };
      case 'SAVE_REG_IN_PRODUCT':
        return { ...state, Reg: payload };
      default:
          return state;    
    }
  };
