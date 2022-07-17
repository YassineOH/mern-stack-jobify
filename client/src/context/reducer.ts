import { Reducer } from "react";
import { initialState } from "./appContext";

import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  VERIFY_USER_BEGIN,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_ERROR,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_BEGIN,
  FORGET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_BEGIN,
  RESET_PASSWORD_ERROR,
} from "./actions";

import { State } from "./appContext";

interface Action {
  type: string;
  payload?: any;
}

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all values!!",
      };

    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };

    case REGISTER_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        showAlert: true,
        isLoading: false,
        alertText: action.payload.msg,
        alertType: "success",
      };

    case REGISTER_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertText: action.payload.msg,
        alertType: "danger",
      };

    case VERIFY_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };

    case VERIFY_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: action.payload.msg,
      };

    case VERIFY_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    case FORGET_PASSWORD_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };

    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: action.payload.msg,
      };

    case FORGET_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };

    case RESET_PASSWORD_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: action.payload.msg,
      };

    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };

    case LOGIN_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        isLoading: false,
        showAlert: true,
        alertText: "Login Created! Redirecting...",
        alertType: "success",
      };

    case LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertText: action.payload.msg,
        alertType: "danger",
      };

    case LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        token: "",
        jobLocation: "",
        userLocation: "",
      };

    case UPDATE_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        jobLocation: action.payload.location,
        userLocation: action.payload.location,
        showAlert: true,
        alertText: "User Profile Updated",
        alertType: "success",
      };

    case UPDATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };

    case HANDLE_CHANGE:
      return {
        ...state,
        page: 1,
        [action.payload.name]: action.payload.value,
      };

    case CLEAR_VALUES:
      return {
        ...state,
        isEditing: false,
        editJobId: "",
        position: "",
        company: "",
        jobLocation: state.userLocation,
        jobType: "full-time",
        status: "pending",
      };

    case CREATE_JOB_BEGIN:
      console.log("first");
      return {
        ...state,
        isLoading: true,
      };

    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "New job created",
      };

    case CREATE_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };

    case TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };

    case GET_JOBS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };

    case GET_JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numOfPages: action.payload.numOfPages,
      };

    case SET_EDIT_JOB:
      return {
        ...state,
        isEditing: true,
        editJobId: action.payload._id,
        position: action.payload.position,
        company: action.payload.company,
        jobLocation: action.payload.jobLocation,
        jobType: action.payload.jobType,
        status: action.payload.status,
      };

    case DELETE_JOB:
      return {
        ...state,
        isLoading: true,
      };

    case EDIT_JOB_BEGIN: {
      return {
        ...state,
        isEditing: true,
      };
    }

    case EDIT_JOB_SUCCESS:
      return {
        ...state,
        isEditing: false,
        showAlert: true,
        alertType: "success",
        alertText: "Job updated!",
      };

    case EDIT_JOB_ERROR:
      return {
        ...state,
        isEditing: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };

    case SHOW_STATS_BEGIN:
      return {
        ...state,
        showAlert: false,
        isLoading: true,
      };

    case SHOW_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stats: action.payload.stats,
        monthlyApplications: action.payload.monthlyApplications,
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        search: "",
        searchStatus: "all",
        searchType: "all",
        sort: "latest",
      };

    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.page,
      };

    default:
      throw new Error(`no such action :${action.type}`);
  }
};
export default reducer;
