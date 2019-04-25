import { combineReducers } from 'redux';
import ProductsReducer from './reducer_products';
import LoginReducer from './reducer_login';

const rootReducer = combineReducers({
  products: ProductsReducer,
  login: LoginReducer
});

export default rootReducer;