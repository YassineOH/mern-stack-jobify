import React, { useReducer, useContext, FC, ReactNode } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_BEGIN,
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
  FORGET_PASSWORD_BEGIN,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  RESET_PASSWORD_BEGIN,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from "./actions";

import reducer from "./reducer";

//  interfaces ====================================
export interface User {
  name: string;
  email: string;
  lastName?: string;
  location?: string;
}

interface UserRegister {
  name?: string;
  email: string;
  password: string;
}

interface UserToken {
  user: User;
  token: string;
  location: string;
}

interface VerifyUser {
  email: string;
  verificationToken: string;
}

interface ResetPassword {
  email: string;
  token: string;
  password: string;
}

export interface stats {
  pending: number;
  interview: number;
  declined: number;
}

export interface State {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  user: UserToken | null;
  token: string | null;
  userLocation: string;
  jobLocation: string;
  showSidebar: boolean;
  isEditing: boolean;
  editJobId: string;
  position: string;
  company: string;
  jobTypeOptions: string[];
  jobType: string;
  statusOptions: string[];
  status: string;
  jobs: any[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: stats | {};
  monthlyApplications: [];
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: [string, string, string, string];
}

interface Props {
  children: ReactNode;
}

interface handleState {
  name: string;
  value: string | number | boolean;
}
// initial states===================================
const token: string | null = localStorage.getItem("token");
const user: string | null = localStorage.getItem("user");
const userLocation: string | null = localStorage.getItem("location");

const initialState: State = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["pending", "interview", "declined"],
  status: "pending",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

// the context =======================>
const AppContext = React.createContext<any>(null);

const AppProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //  Axios Instance
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  // Axios interceptors for REQUEST
  authFetch.interceptors.request.use(
    (config: any): AxiosRequestConfig => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
  // Axios interceptors for RESPONSE
  authFetch.interceptors.response.use(
    (response: any): AxiosResponse => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  // FUNCTIONS FOR REDUCES =================+++++
  const addUserToLocalStorage = ({
    user,
    token,
    location,
  }: UserToken): void => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = (): void => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  const displayAlert = (): void => {
    dispatch({ type: DISPLAY_ALERT });

    setTimeout(() => {
      clearAlert();
    }, 2000);
  };

  const clearAlert = (): void => {
    dispatch({ type: CLEAR_ALERT });
  };

  const registerUser = async (currentUser: UserRegister) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      const { msg } = response.data;

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          msg,
        },
      });
    } catch (error: any) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });

      setTimeout(() => {
        clearAlert();
      }, 5000);
    }
  };

  const verifyUser = async ({ email, verificationToken }: VerifyUser) => {
    dispatch({ type: VERIFY_USER_BEGIN });
    console.log(email);
    console.log(verificationToken);
    try {
      const response = await axios.post("/api/v1/auth/verify-email", {
        verificationToken,
        email,
      });
      console.log(response.data);
      const { msg } = response.data;
      dispatch({
        type: VERIFY_USER_SUCCESS,
        payload: {
          msg,
        },
      });
    } catch (error: any) {
      dispatch({
        type: VERIFY_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
  };

  const loginUser = async (currentUser: UserRegister) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/login", currentUser);
      const { user, token, location } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error: any) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    setTimeout(() => {
      clearAlert();
    }, 5000);
  };

  const logoutUser = (): void => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser: User) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const response = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, token, location } = response.data;
      addUserToLocalStorage({ user, token, location });
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });
    } catch (error: any) {
      if (error.response.status === 401) return;
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    setTimeout(() => {
      clearAlert();
    }, 5000);
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    const { position, company, jobLocation, jobType, status } = state;
    try {
      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });

      dispatch({ type: CREATE_JOB_SUCCESS });
      clearValues();
    } catch (error: any) {
      console.log(CREATE_JOB_ERROR);
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }

    setTimeout(() => {
      clearAlert();
    }, 3000);
  };

  const toggleSidebar = (): void => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const handleChange = ({ name, value }: handleState): void => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: {
        name,
        value,
      },
    });
  };

  const clearValues = (): void => {
    dispatch({ type: CLEAR_VALUES });
  };

  const getJobs = async () => {
    const { sort, searchStatus, searchType, search, page } = state;
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const response = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = response.data;

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error: any) {
      console.log(error.response);
      logoutUser();
    }
  };

  const setEditJob = (id: number) => {
    const [job] = state.jobs.filter((job: any) => job._id === id);
    const { _id, position, company, jobLocation, jobType, status } = job;
    dispatch({
      type: SET_EDIT_JOB,
      payload: {
        _id,
        position,
        company,
        jobLocation,
        jobType,
        status,
      },
    });
    console.log(`set edit job ${id}`);
  };
  const deleteJob = async (id: string) => {
    dispatch({ type: DELETE_JOB });
    try {
      await authFetch.delete(`/jobs/${id}`);
      getJobs();
    } catch (error) {
      logoutUser();
    }
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { company, position, jobLocation, jobType, status } = state;
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error: any) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: {
          msg: error.response.date.msg,
        },
      });
    }

    setTimeout(() => {
      clearAlert();
    }, 3000);
  };

  const changePage = (page: number) => {
    dispatch({
      type: CHANGE_PAGE,
      payload: {
        page,
      },
    });
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const response = await authFetch("/jobs/stats");
      const { defaultStatus, monthlyApplications } = response.data;

      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: defaultStatus,
          monthlyApplications,
        },
      });
    } catch (error: any) {
      logoutUser();
    }
  };

  const forgetPassword = async (email: string) => {
    dispatch({ type: FORGET_PASSWORD_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/forget-password", {
        email,
      });
      dispatch({
        type: FORGET_PASSWORD_SUCCESS,
        payload: {
          msg: response.data.msg,
        },
      });
    } catch (error: any) {
      dispatch({
        type: FORGET_PASSWORD_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
  };

  const resetPassword = async ({ email, token, password }: ResetPassword) => {
    dispatch({ type: RESET_PASSWORD_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/reset-password", {
        email,
        token,
        password,
      });

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: {
          msg: response.data.msg,
        },
      });
    } catch (error: any) {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        logoutUser,
        updateUser,
        toggleSidebar,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
        clearAlert,
        verifyUser,
        forgetPassword,
        resetPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState };
