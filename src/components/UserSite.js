import React, { Component } from 'react';
import axios from 'axios';

class UserSite extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: sessionStorage.username,
            money: sessionStorage.money,
            myhistory:[],
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
      var myhistory = this.state.myhistory;
      if(to_user && sendmoney && sendmoney <= this.state.money && to_user !== from_user){
        axios.post('http://localhost:3000/sendmoney', {
            from_user: from_user,
            to_user: to_user,
            money: sendmoney,
            date: today,
        })
        .then(function (response) {
            if(response && response.data !== "failed"){
              var mes = "You sent " + to_user + " " + sendmoney + " coins on " + today;
              var item = <li key={myhistory.length} className="list-group-item">{mes}</li>;
              myhistory = myhistory.concat(item);
              sessionStorage.money = self.state.money - sendmoney;
              self.setState({
                money: sessionStorage.money,
                myhistory: myhistory
              })
              sessionStorage.history = JSON.stringify(JSON.parse(sessionStorage.history).concat(response.data));
              alert("Transaction success !!!");
            }
          else alert("You wanna send money to ?");
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      else{
        alert("Something not right !");
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
            <h4>My recent history</h4>
            <ul id ="list" className="list-group">
            {this.state.myhistory}
            </ul>
            </div>
        )
    }

    handleLogout = () =>{
      sessionStorage.clear();
      window.location ="/";
    }

    componentDidMount(){
      const history = JSON.parse(sessionStorage.history);
      var mes = "";
      var myhistory = [];

      for(let i=0;i<history.length;i++){
        console.log(history);
        if(history[i].from_user === this.state.username){
          mes = "You sent " + history[i].to_user + " " + history[i].money + " coins on " + history[i].date;
          myhistory.push(<li key={i} className="list-group-item">{mes}</li>);
        }
        if(history[i].to_user === this.state.username){
          mes = "You received "+ history[i].money + " coins from " + history[i].from_user +" on " + history[i].date;
          myhistory.push(<li key={i} className="list-group-item">{mes}</li>)
        }
      }
      this.setState({
         myhistory: myhistory
      })
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
