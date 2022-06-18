import { createStore, combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {  newProductReducer, newReviewReducer, productsReducer,productsDetailReducer, productReducer, productReviewsReducer, reviewReducer } from "./reducers/productReducer";
import {ProfileReducer, userReducer,   forgotPasswordReducer, allUsersReducer, userDetailsReducer,} from "./reducers/userReducer"
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, OrderDetailsReducer, orderReducer } from "./reducers/orderReducer";
const reducer = combineReducers({
    product:productsDetailReducer,
    products:productsReducer,
    user:userReducer,
    profile:ProfileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    order:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetail:OrderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    ProductEdit:productReducer,
    allOrders: allOrdersReducer,
    orderUpdate: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer
    // productsred:productReducer,

    
    
});

let initialState = {
    cart:{
        cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems") )
        : [],
        shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;



