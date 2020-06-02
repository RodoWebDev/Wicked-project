// @flow
import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  ADD_COMPANY,
  GET_COMPANIES,
  GET_COMPANY,
  CREATE_COLUMN,
  UPDATE_COMPANY,
} from "../../constants/actionTypes";
import {
  addCompanySuccess,
  editCompanySuccess,
  createColumnSuccess
} from "./actions";

/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */
const fetchJSON = (url, options = {}) => {
  return axios(url, options)
    .then(json => {
      return json.data;
    })
    .catch(error => {
      throw error;
    });
};

function* _addCompany({ payload : { company } }) {
  
  const options = {
    data: { company },
    method: "POST"
  };
  try {
    
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}settings/addCompany`,
      options
    );
    yield put(addCompanySuccess(response));

  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    // yield put(getSettingFailed(message));
  }
}

function* _getCompanies() {
  
  const options = {
    method: "GET"
  };
  try {
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}settings/getCompany`,
      options
    );
    yield put(addCompanySuccess(response));    

  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
  }
}

function* _createColumn({ payload: id }) {
  yield put(createColumnSuccess());
}

function* _updateCompany({ payload : {company, id}}) {
  const options = {
    data: { id, company },
    method: "POST"
  };
  console.log("options ==>", options);
  try {    
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}settings/updateCompany`,
      options
    );
    // yield put(addCompanySuccess(response));

  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
  }
}

function* _getCompany({ payload: id }) {
  
  const options = {
    method: "GET"
  };
  try {
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}settings/getCompany/${id}`,
      options
    );
    yield put(editCompanySuccess(response));    

  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
  }
}

export function* watchAddCompany(): any {
  yield takeEvery(ADD_COMPANY, _addCompany);
}

export function* watchGetCompanies(): any {
  yield takeEvery(GET_COMPANIES, _getCompanies);
}

export function* watchGetCompany(): any {
  yield takeEvery(GET_COMPANY, _getCompany);
}

export function* watchCreateColumn(): any {
  yield takeEvery(CREATE_COLUMN, _createColumn);
}

export function* watchUpdateCompany(): any {
  yield takeEvery(UPDATE_COMPANY, _updateCompany);
}

function* companySaga(): any {
  yield all([
    fork(watchAddCompany),
    fork(watchGetCompanies),
    fork(watchGetCompany),
    fork(watchCreateColumn),
    fork(watchUpdateCompany)
  ]);
}

export default companySaga;
