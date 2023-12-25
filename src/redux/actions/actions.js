import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH_TOKEN_ACTION, AUTH_ERRORS_ACTION } from "../slicers/authSlice";
import {
  REGISTER_API,
  LOGIN_API,
  PROFILE_EDIT_API,
  PROFILE_DELETE_API,
  GET_CRUD_API,
  CREATE_CRUD_API,
  API,
  GET_PROFILE_API,
  CRUD_API,
} from "../../config";
import { GET_PROFILE_ACTION } from "../slicers/profileSlice";
import { CREATE_CRUD_ACTION, GET_CRUD_ACTION } from "../slicers/crudSlice";

export const REGISTER_ASYNC = createAsyncThunk(
  "auth/REGISTER_ASYNC",
  async (userData, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await axios.post(REGISTER_API, userData);
      console.log(response.data);
      if (response.data.token) {
        dispatch(AUTH_TOKEN_ACTION(response.data.token));
      }
    } catch (error) {
      const responseErrors = error.response.data.errors;
      const allErrors = responseErrors.reduce((acc, rec) => {
        if (acc[rec.path]) {
          acc[rec.path] = `${acc[rec.path]} ${rec.msg}`;
        } else {
          acc[rec.path] = rec.msg;
        }
        return acc;
      }, {});
      console.log(allErrors);
      dispatch(AUTH_ERRORS_ACTION(allErrors));
      return rejectWithValue(error.message);
    }
  },
);

export const LOGIN_ASYNC = createAsyncThunk(
  "auth/LOGIN_ASYNC",
  async (userData, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await axios.post(LOGIN_API, userData);
      console.log(response.data);
      if (response.data.token) {
        dispatch(AUTH_TOKEN_ACTION(response.data.token));
      }
    } catch (error) {
      const responseErrors = error.response.data.errors;

      const allErrors = responseErrors.reduce((acc, rec) => {
        if (acc[rec.path]) {
          acc[rec.path] = `${acc[rec.path]} ${rec.msg}`;
        } else {
          acc[rec.path] = rec.msg;
        }
        return acc;
      }, {});
      dispatch(AUTH_ERRORS_ACTION(allErrors));
      return rejectWithValue(error.message);
    }
  },
);

export const PROFILE_ASYNC = createAsyncThunk(
  "profile/PROFILE_ASYNC",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const { auth } = getState().auth;
      const response = await axios.get(GET_PROFILE_API, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      dispatch(GET_PROFILE_ACTION(response.data.user));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const PROFILE_EDIT_ASYNC = createAsyncThunk(
  "profile/PROFILE_EDIT_ASYNC",
  async (userData, { rejectWithValue, dispatch, getState }) => {
    console.log(userData);

    try {
      const { auth } = getState().auth;
      const response = await axios.patch(PROFILE_EDIT_API, userData, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      if (response.data.token) {
        dispatch(AUTH_TOKEN_ACTION(response.data.token));
        dispatch(GET_PROFILE_ACTION(response.data.updatedUser));
      }
      return response.data;
    } catch (error) {
      const responseErrors = error.response.data.errors;

      const allErrors = responseErrors.reduce((acc, rec) => {
        if (acc[rec.path]) {
          acc[rec.path] = `${acc[rec.path]} ${rec.msg}`;
        } else {
          acc[rec.path] = rec.msg;
        }
        return acc;
      }, {});
      dispatch(AUTH_ERRORS_ACTION(allErrors));
      return rejectWithValue(error.message);
    }
  },
);

export const PROFILE_DELETE_ASYNC = createAsyncThunk(
  "profile/PROFILE_DELETE_ASYNC",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const { auth } = getState().auth;
      const response = await axios.delete(PROFILE_DELETE_API, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const CRUD_ASYNC = createAsyncThunk(
  "crud/CRUD_ASYNC",
  async (payload, { rejectWithValue, dispatch, getState }) => {
    try {
      const { search, status } = payload;
      const { auth } = getState().auth;

      const response = await axios.get(
        GET_CRUD_API +
          `?search=${search}&status=${status === "reset" ? "" : status}`,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        },
      );

      console.log(response.data.products);
      dispatch(GET_CRUD_ACTION(response.data.products));
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const CREATE_CRUD_ASYNC = createAsyncThunk(
  "crud/CREATE_CRUD_ASYNC",
  async (crud, { rejectWithValue, dispatch, getState }) => {
    try {
      const { auth } = getState().auth;

      const response = await axios.post(CREATE_CRUD_API, crud, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      dispatch(CREATE_CRUD_ACTION(response.data));
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const EDIT_CRUD_ASYNC = createAsyncThunk(
  "crud/EDIT_CRUD_ASYNC",
  async (obj, { rejectWithValue, dispatch, getState }) => {
    try {
      const { auth } = getState().auth;

      const res = await axios.patch(
        CRUD_API + `/${obj.product._id}/title`,
        {
          title: obj.promptTitle,
          description: obj.promptDescr,
        },
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        },
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const DONE_CRUD_ASYNC = createAsyncThunk(
  "crud/DONE_CRUD_ASYNC",
  async (id, { rejectWithValue, dispatch, getState }) => {
    try {
      const { auth } = getState().auth;

      const res = await axios.patch(CRUD_API + `${id}/status`, id, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const DELETE_CRUD_ASYNC = createAsyncThunk(
  "crud/DELETE_CRUD_ASYNC",
  async (id, { rejectWithValue, dispatch, getState }) => {
    try {
      const { auth } = getState().auth;

      const res = await axios.delete(CRUD_API + `${id}/delete`, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const IMAGE_CRUD_ASYNC = createAsyncThunk(
  "crud/IMAGE_CRUD_ASYNC",
  async (id, { rejectWithValue, dispatch, getState }) => {
    try {
      const { auth } = getState().auth;

      const res = await axios.patch(CRUD_API + `${id}/image`, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);
