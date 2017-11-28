import React, { Component } from 'react';
import axios from 'axios';

class UserSite extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: sessionStorage.username,
            money: sessionStorage.money,
            history:[],
        }
    }

    getDate = () => {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
          dd = '0'+dd
      }

      if(mm<10) {
          mm = '0'+mm
      }

      today = mm + '/' + dd + '/' + yyyy;
      return today;
    }

    handleSendmoney = () =>{
      var self = this;
      var today = self.getDate();
      const from_user = this.state.username;
      const to_user = this.refs.to_user.value;
      const sendmoney = parseFloat(this.refs.money.value);
      if(to_user && sendmoney && sendmoney <= this.state.money){
        axios.post('http://localhost:3000/sendmoney', {
            from_user: from_user,
            to_user: to_user,
            money: sendmoney,
            date: today,
        })
        .then(function (response) {
          console.log(response.data);
          sessionStorage.money = self.state.money - sendmoney;
          self.setState({
            money: self.state.money - sendmoney,
          })
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      else{
        console.log(this.state.money)
        alert("Something not right !")
      }
    }


    renderSendMoney = () => {
        return(
            <div className= "sendmoney-form">
            <h4>Send money</h4>
            <div>
                <input ref="money" type="number" name="u" placeholder="Money" required="required" />
                <input ref="to_user" type="text" name="p" placeholder="Send to" required="required" />
                <button onClick={this.handleSendmoney.bind(this)} className="btn btn-primary btn-block btn-large">Send</button>
            </div>
            </div>
        )
    }

    renderHistory = () => {
        return (
            <div className= "history-form">
            <h4>History</h4>
            <ul id ="list" className="list-group">

            <li className="list-group-item">Cras justo odio</li>
            </ul>
            </div>
        )
    }

    handleLogout = () =>{
      sessionStorage.clear();
      window.location ="/";
    }
    render(){
        if(sessionStorage.length === 0)
          return "Get the fuck out of here!!!";
        return(
            <div className="usersite">
            <h1>{this.state.username}'s wallet</h1>
            <button type="button" onClick={this.handleLogout.bind(this)} id="logout-btn" className="btn btn-danger btn-block btn-large">Log out</button>
            <h3>You're having: {this.state.money}</h3>
            {this.renderSendMoney()}
            {this.renderHistory()}
            </div>
        )
    }
}

export default UserSite;
