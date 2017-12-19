const initState = {
  username: sessionStorage.username,
  money: sessionStorage.money,
  myhistory: [],
}

const userReducer = (state = initState, action) => {
  switch(action.type){
    case "SENDING_MONEY":
      return {
        ...state,
      }
    case "SEND_MONEY_SUCCESS":
      return {
        ...state,
        myhistory: state.myhistory.concat(action.mes),
        money: action.money,
      }
    case "SEND_MONEY_FAIL":
      return {
        ...state,
      }
    case "INIT_MYHISTORY":
      return {
          ...state,
          myhistory: action.myhistory,
      }
    default:
      return state;
  }
}

export default userReducer;
