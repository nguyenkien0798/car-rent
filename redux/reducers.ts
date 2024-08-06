import { combineReducers } from "redux";
import authSlice from "@/redux/slice/auth";
import productSlice from "@/redux/slice/product"
import paymentSlice from "@/redux/slice/payment"

const rootReducer = combineReducers({
  auth: authSlice,
  product: productSlice,
  payment: paymentSlice
});

export default rootReducer;
