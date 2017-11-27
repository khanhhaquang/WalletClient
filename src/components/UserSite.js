import React, { Component } from 'react';

class UserSite extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "khanh",
            money: 1000,
        }
    }
    renderSendMoney = () => {
        return(
            <div className= "sendmoney-form">
            <h4>Send money</h4>
            <div>
                <input type="number" name="u" placeholder="Money" required="required" />
                <input type="text" name="p" placeholder="Send to" required="required" />
                <button className="btn btn-primary btn-block btn-large">Send</button>
            </div>
            </div>
        )
    }

    renderHistory = () => {
        return (
            <div className= "history-form">
            <h4>History</h4>
            <ul id ="list" class="list-group">

            <li class="list-group-item">Cras justo odio</li>
            </ul>
            </div>
        )
    }

    handleLogout = () =>{
      window.location ="/";
    }
    render(){
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
