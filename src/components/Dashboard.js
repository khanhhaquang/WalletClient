import React, { Component } from 'react';
const STAGE_1 = 1;
const STAGE_2 = 2;
const STAGE_3 = 3;
class History extends Component{

    renderList = () =>{
    }

    render(){
        return(
            <div className= "history">
                <h2>History</h2>
                <ul id ="list" class="list-group">
                    <li class="list-group-item">Cras justo odio</li>
                </ul>
            </div>
        )
    }
}


class Login extends Component{
    render(){
        return(
            <div className= "login-form">
            <h2>Login</h2>
            <form>
                <input type="text" name="u" placeholder="Username" required="required" />
                <input type="password" name="p" placeholder="Password" required="required" />
                <button type="submit" className="btn btn-primary btn-block btn-large">Let me in.</button>
            </form>
            </div>
        )
    }
}

class Signup extends Component{
    render(){
        return(
            <div className= "signup-form">
            <h2>Sign Up</h2>
            <form>
                <input type="text" name="u" placeholder="Username" required="required" />
                <input type="password" name="p" placeholder="Password" required="required" />
                <input type="password" name="p" placeholder="Confirm Password" required="required" />
                
                <button type="submit" className="btn btn-primary btn-block btn-large">Create my account</button>
            </form>
            </div>
        )
    }
}

class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state = {
            mainStage: 1,
            history: [],
            errMes: "",
        }
    }

    renderForm = () => {
        switch(this.state.mainStage){
            case STAGE_1:
                return <History/>
            case STAGE_2:
                return <Signup/>
            case STAGE_3:
                return <Login/>
        }
    }

    renderGroupButton = () =>{
        return(
            <div className="group-button"> 
            <button onClick={() => { this.setState({ mainStage: 1})}} type="button" id="history-btn" className="btn btn-primary">History</button>
            <button onClick={() => { this.setState({ mainStage: 3})}} type="button" id="login-btn" className="btn btn-success">Log in</button>
            <button onClick={() => { this.setState({ mainStage: 2})}} type="button" id="signup-btn" className="btn btn-info">Sign up</button> 
            </div>
        );
    }


    componentWillMount()
    {

    }

    render(){
        return(
            <div className="dashboard">
                <h1>Welcome to wallet</h1>
                {this.renderGroupButton()}
                <div className="button-group"></div>
                {this.renderForm()}
                <div id="alertMes" className="alert alert-danger" role="alert">
                    <strong>{this.state.errMes}</strong>
                </div>
            </div>
        )
    }
}

export default Dashboard;