const initState = {
  mainStage: 1,
  history: [],
  errMes: "",
}

const mainReducer = (state = initState, action) => {
  switch(action.type){
    case "CHANGE_FORM":
      return{
        ...state,
        mainStage: action.stage,
        errMes: "",
      }

    case "FETCHING_HISTORY":
      return {
        ...state,
      }
    case "FETCH_HISTORY_SUCCESS":
      return {
        ...state,
        history: action.history,
      }
    case "FETCH_HISTORY_FAIL":
      return {
        ...state,
      }
    case "LOGIN":
      return{...state}
    case "LOGIN_SUCCESS":
      return{...state, errMes: ""}
    case "LOGIN_FAIL":
      return{...state,errMes: action.message};
    case "SIGNUP":
      return{...state}
    case "SIGNUP_SUCCESS":
      return{...state, errMes: action.message}
    case "SIGNUP_FAIL":
      return{...state,errMes: action.message};

    default:
      return state;
  }
}


export default mainReducer;
