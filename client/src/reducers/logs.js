import axios from "axios";
const GET_LOGS = "GET_LOGS";

const initialState = {
  listOfLogs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS: {
      return {
        ...state,
        listOfLogs: action.listOfLogs,
      };
    }
    default:
      return state;
  }
};

export function getAllLogs() {
  return (dispatch) => {
    axios.get("http://localhost:5000/api/v1/logs").then(({ data }) => {
      dispatch({
        type: GET_LOGS,
        listOfLogs: data,
      });
    });
  };
}