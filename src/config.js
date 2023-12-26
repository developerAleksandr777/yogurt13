export const API = "https://yogurt13-api.onrender.com";

// export const API = "http://localhost:5055";

export const AUTH_API = API + "/auth/";
export const CRUD_API = API + "/crud/";
export const PROFILE_API = API + "/profile/";
export const REGISTER_API = AUTH_API + "register";
export const LOGIN_API = AUTH_API + "login";
export const GET_PROFILE_API = PROFILE_API + "user";
export const PROFILE_EDIT_API = PROFILE_API + "user-edit";
export const PROFILE_DELETE_API = PROFILE_API + "user-delete";
export const GET_CRUD_API = CRUD_API + "crud-get";
export const CREATE_CRUD_API = CRUD_API + "create-new-crud";
export const CHART_CRUD_API = CRUD_API + "chart-crud";
