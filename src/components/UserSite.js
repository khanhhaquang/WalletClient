import React, { Component } from 'react';
import axios from 'axios';
import * as actions from './../actions/userActions.js'
import {connect} from 'react-redux';

class UserSite extends Component{

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
      var today = this.getDate();
      const from_user = this.props.username;
      const to_user = this.refs.to_user.value;
      const sendmoney = parseFloat(this.refs.money.value);
      var myhistory = this.props.myhistory;
      if(to_user && sendmoney && sendmoney <= this.props.money && to_user !== from_user){
        this.props.dispatch(actions.sendMoney(from_user,to_user,sendmoney,today))
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
              {this.props.myhistory.map((data,index)=>
                <li key={index} className="list-group-item">{data}</li>
              )}
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
        if(history[i].from_user === this.props.username){
          mes = "You sent " + history[i].to_user + " " + history[i].money + " coins on " + history[i].date;
          myhistory.push(mes)
        }
        if(history[i].to_user === this.props.username){
          mes = "You received "+ history[i].money + " coins from " + history[i].from_user +" on " + history[i].date;
          myhistory.push(mes)
        }
      }
      this.props.dispatch(actions.initMyhistory(myhistory));
    }

    render(){
        if(sessionStorage.length === 0)
          return "Get the fuck out of here!!!";
        return(
            <div className="usersite">
            <h1>{this.props.username} 's wallet</h1>
            <button type="button" onClick={this.handleLogout.bind(this)} id="logout-btn" className="btn btn-danger btn-block btn-large">Log out</button>
            <h3>You're having: {this.props.money}</h3>
            {this.renderSendMoney()}
            {this.renderHistory()}
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
      username: state.userData.username,
      money: state.userData.money,
      myhistory: state.userData.myhistory,
    }
}

export default connect(mapStateToProps)(UserSite);
