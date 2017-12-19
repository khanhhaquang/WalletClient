import axios from 'axios';

export function initMyhistory(myhistory){
  return {type : "INIT_MYHISTORY", myhistory: myhistory}
}

function sendingMoney(){
  return {type : "SENDING_MONEY"}
}

function sendSuccess(mes,money){
  return {type : "SEND_MONEY_SUCCESS", mes: mes, money: money}
}
function sendFail(){
  return {type : "SEND_MONEY_FAIL"}
}

export function sendMoney(from_user,to_user,sendmoney,today){
  return dispatch =>{
    dispatch(sendingMoney())
    axios.post('http://localhost:3000/sendmoney', {
        from_user: from_user,
        to_user: to_user,
        money: sendmoney,
        date: today,
    })
    .then(response => {
        if(response && response.data !== "failed"){
          var mes = "You sent " + to_user + " " + sendmoney + " coins on " + today;
          sessionStorage.money = sessionStorage.money - sendmoney;
          dispatch(sendSuccess(mes,sessionStorage.money))

          sessionStorage.history = JSON.stringify(JSON.parse(sessionStorage.history).concat(response.data));
          alert("Transaction success !!!");
        }
        else{dispatch(sendFail()); alert("You wanna send money to ?");}
    })
    .catch(err =>{
      dispatch(sendFail())
    })
  }
}
