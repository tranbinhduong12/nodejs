import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import {
  getCategoryStart,
  getCategorySuccess,
  getCategoryFailure
} from "./categoryRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(loginFailure());
    return null;
  }
};

// logout
export const logoutUser = async (dispatch) => {
  dispatch(logout());
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/product");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/product/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/product/${id}`, product);
    dispatch(updateProductSuccess(res.data));
    return true;
  } catch (err) {
    dispatch(updateProductFailure());
    return false;
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    console.log(product);
    const res = await userRequest.post(`/product`, product);
    dispatch(addProductSuccess(res.data));
    return res;
  } catch (err) {
    dispatch(addProductFailure());
    return false;
  }
};
export const getCategories = async (dispatch) => {
  dispatch(getCategoryStart());
  try {
    const res = await publicRequest.get("/category");
    dispatch(getCategorySuccess(res.data));
  } catch (err) {
    dispatch(getCategoryFailure());
  }
};
