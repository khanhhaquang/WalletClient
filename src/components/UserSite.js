import React, { Component } from 'react';
const STAGE_1 = 1;
const STAGE_2 = 2;
const STAGE_3 = 3;
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
            <form>
                <input type="number" name="u" placeholder="Money" required="required" />
                <input type="text" name="p" placeholder="Send to" required="required" />
                <button type="submit" className="btn btn-primary btn-block btn-large">Send</button>
            </form>
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
    render(){
        return(
            <div className="usersite">
            <h1>{this.state.username}'s wallet</h1>
            <h3>You're having: {this.state.money}</h3>
            {this.renderSendMoney()}
            {this.renderHistory()}
            </div>
        )
    }
}

export default UserSite;