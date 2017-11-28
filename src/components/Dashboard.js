import React, { Component } from 'react';
import axios from 'axios';
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
                <ul id ="list" className="list-group">
                    <li className="list-group-item">Cras justo odio</li>
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
            <div>
                <input ref="username" type="text" name="u" placeholder="Username" required="required" />
                <input ref="password" type="password" name="p" placeholder="Password" required="required" />
                <button onClick={this.props.onClick} className="btn btn-primary btn-block btn-large">Let me in.</button>
            </div>
            </div>
        )
    }
}

class Signup extends Component{
    render(){
        return(
            <div className= "signup-form">
            <h2>Sign Up</h2>
            <div>
                <input ref="username" type="text" name="u" placeholder="Username" required="required" />
                <input ref="password" type="password" name="p" placeholder="Password" required="required" />
                <input ref="confirm_password" type="password" name="p" placeholder="Confirm Password" required="required" />

                <button onClick={this.props.onClick} className="btn btn-primary btn-block btn-large">Create my account</button>
            </div>
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

    handleLogin = () => {
      const username = this.refs.login.refs.username.value;
      const password = this.refs.login.refs.password.value;
      if(username && password){
        axios.get('localhost:3000/login', {
          params: {
            username: username,
            password: password,
          }
        })
        .then(function (response) {
          console.log(response);
          this.setState({
            errMes: ""
          })
          window.location = '/usersite';
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      else{
        this.setState({
          errMes: "Username or Password is invalid!"
        })
      }
    }
    handleSignup = () => {
      const username = this.refs.signup.refs.username.value;
      const password = this.refs.signup.refs.password.value;
      const confirm_password = this.refs.signup.refs.confirm_password.value
      if(username && password && confirm_password){
        if(password === confirm_password){
          axios.post('localhost:3000/signup', {
            params: {
              username: username,
              password: password,
            }
          })
          .then(function (response) {
            console.log(response);
            this.setState({
              errMes: "Success !!!"
            })
          })
          .catch(function (error) {
            console.log(error);
          });

        }
        else{
          this.setState({
            errMes: "Please confirm right password !"
          })
        }
      }
      else{
        this.setState({
          errMes: "You missed something ?"
        })
      }
    }

    renderForm = () => {
        switch(this.state.mainStage){
            case STAGE_1:
                return <History/>
            case STAGE_2:
                return <Signup ref="signup" onClick = {this.handleSignup.bind(this)}/>
            case STAGE_3:
                return <Login ref="login" onClick = {this.handleLogin.bind(this)}/>
                default: console.log("error")
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
      axios.get('localhost:3000/inithistory', {
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
