import axios from 'axios';
export function changeForm(stage){
  return {type: "CHANGE_FORM", stage: stage}
}

function fetchingHistory(){
  return {type : "FETCHING_HISTORY"}
}

function fetchSuccess(history){
  return {type : "FETCH_HISTORY_SUCCESS", history: history}
}
function fetchFail(){
  return {type : "FETCH_HISTORY_FAIL"}
}

export function fetchHistory(){
  return dispatch =>{
    dispatch(fetchingHistory())
    return axios.get('http://localhost:3000/inithistory')
    .then(response =>{
      var history = [];
      var mes = "";
      var data = response.data;
      for(let i =0 ;i<data.length;i++){
        mes = data[i].from_user + " sent to " + data[i].to_user + " " + data[i].money + " coins on " + data[i].date;
        history.push(mes);
      }
      sessionStorage.history = JSON.stringify(data);
      dispatch(fetchSuccess(history))
    })
    .catch(err =>{
      dispatch(fetchFail())
    })
  }
}

function loginStart(){
  return {type : "LOGIN"}
}

function loginSuccess(){
  return {type : "LOGIN_SUCCESS"}
}
function loginFail(message){
  return {type : "LOGIN_FAIL", message: message}
}

export function login(username,password){
  return dispatch => {
    dispatch(loginStart())
    if(username && password){
    axios.get('http://localhost:3000/login', {
      params:{
        username: username,
        password: password,
      }
    })
    .then(response => {
      if(response && response.data !== "failed"){
        var data = response.data;
        sessionStorage.username = data.username;
        sessionStorage.money = data.money;
        dispatch(loginSuccess())
        window.location = '/usersite';
      }
      else{
        dispatch(loginFail("Invalid username or password"))
      }
    })
    .catch(error => {
      console.log(error);
      dispatch(loginFail("Invalid username or password"))
    });
  }
  else{
    dispatch(loginFail("Invalid username or password"))
  }
  }
}


function signupStart(){
  return {type : "SIGNUP"}
}

function signupSuccess(message){
  return {type : "SIGNUP_SUCCESS", message:message}
}
function signupFail(message){
  return {type : "SIGNUP_FAIL", message: message}
}

export function signup(username,password,confirm_password){
  return dispatch => {
    dispatch(signupStart())
    if(username && password && confirm_password === password){
      axios.post('http://localhost:3000/signup', {
          username: username,
          password: password,
      })
      .then(response=> {
        if(response && response.data !== "exist")
          dispatch(signupSuccess("Success !!!"))
        else
          dispatch(signupFail("This username has been used !"))
      })
      .catch(error=> {
        dispatch(signupFail("Please fill right information !"))
        console.log(error);
      });
    }
    else{
      dispatch(signupFail("Please fill right information !"))
    }
  }
}
