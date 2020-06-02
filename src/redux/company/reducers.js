// @flow
import {
  ADD_COMPANY,
  ADD_COMPANY_SUCCESS,
  GET_COMPANY_SUCCESS,
  CREATE_COLUMN_SUCCESS,
  SET_ACTIVE
} from '../../constants/actionTypes';


const INIT_STATE = {
  loading: false,
  companies: [],
  error: null,
  company: null,
  textarray: [],
  outarray: [],  
  active: 'financial',
};


type CompanyAction = {
  type: string,
  payload: {} | string
};
type State = {
  companies?: [] | null,
  loading?: boolean
};

const Company = (state: State = INIT_STATE, action: CompanyAction) => {
  switch (action.type) {
    case ADD_COMPANY:
      return {
        ...state, companies: []
      };
    case ADD_COMPANY_SUCCESS:
      return {
        ...state, companies: action.payload
      };
    case GET_COMPANY_SUCCESS:
      return {
        ...state, company: action.payload
      };
    case CREATE_COLUMN_SUCCESS:
      let _header = {
        'headername': 'Header',
        'text': 'Text',
        'textarray': [],
        'outarray': [],
      }
      for(var i=0;i<100;i++)
      {
        _header.textarray[i] = 0;
        _header.outarray[i] = 0;
      }
      let headers = state.company.headers;
      headers.push(_header);
      var newCompany = {...state.company, headers}
      return {
        ...state, company: newCompany
      };
    case SET_ACTIVE:
        return {
          ...state, active: action.payload
        };
    default:
      return state
  }
};

export default Company;