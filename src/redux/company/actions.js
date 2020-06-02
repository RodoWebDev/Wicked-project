import {
  GET_COMPANIES,
  ADD_COMPANY,
  ADD_COMPANY_SUCCESS,
  GET_COMPANY,
  GET_COMPANY_SUCCESS,
  CREATE_COLUMN,
  CREATE_COLUMN_SUCCESS,
  SET_ACTIVE,
  UPDATE_COMPANY
} from "../../constants/actionTypes";

type CompanyAction = {
  type: string,
  payload: {} | string
};

export const addCompany = (
  company: string,
): CompanyAction => ({
  type: ADD_COMPANY,
  payload: { company }
});

export const addCompanySuccess = (companies: []): CompanyAction => ({
  type: ADD_COMPANY_SUCCESS,
  payload: companies
});

export const editCompanySuccess = (company: []): CompanyAction => ({
  type: GET_COMPANY_SUCCESS,
  payload: company
});

export const getCompanies = (): CompanyAction => ({
  type: GET_COMPANIES
});

export const getCompany = (id: string): CompanyAction => ({
  type: GET_COMPANY,
  payload: id
});

export const createColumn = (id: string): CompanyAction => ({
  type: CREATE_COLUMN
});

export const createColumnSuccess = (): CompanyAction => ({
  type: CREATE_COLUMN_SUCCESS
});

export const setActive = (active: string): CompanyAction => ({
  type: SET_ACTIVE,
  payload: active
});

export const updateCompany = (company, id): CompanyAction =>({
  type: UPDATE_COMPANY,
  payload: { id, company }
});
