import React, { Component } from 'react';
import axios from 'axios';
import * as actions from './../actions/mainActions.js'
import {connect} from 'react-redux';

const STAGE_1 = 1;
const STAGE_2 = 2;
const STAGE_3 = 3;
const History = (props) => {
    const renderList = props.list.map((data,index) =>
        <li key={index} className="list-group-item">{data}</li>
      )

    return(
            <div className= "history">
                <h2>System History</h2>
                <ul id ="list" className="list-group">
                    {renderList}
                </ul>
            </div>
        )
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
      const self = this;
      const username = this.refs.login.refs.username.value;
      const password = this.refs.login.refs.password.value;
      this.props.dispatch(actions.login(username,password));
    }
    handleSignup = () => {
      const self = this;
      const username = this.refs.signup.refs.username.value;
      const password = this.refs.signup.refs.password.value;
      const confirm_password = this.refs.signup.refs.confirm_password.value
      this.props.dispatch(actions.signup(username,password,confirm_password))
    }

    renderForm = () => {
        switch(this.props.mainStage){
            case STAGE_1:
                return <History list={this.props.history}/>
            case STAGE_2:
                return <Signup ref="signup" onClick = {this.handleSignup.bind(this)}/>
            case STAGE_3:
                return <Login ref="login" onClick = {this.handleLogin.bind(this)}/>
            default: console.log("error");
        }
    }

    renderGroupButton = () =>{
        return(
            <div className="group-button">
            <button onClick={() => this.props.dispatch(actions.changeForm(1))} type="button" id="history-btn" className="btn btn-primary">History</button>
            <button onClick={() => this.props.dispatch(actions.changeForm(3))} type="button" id="login-btn" className="btn btn-success">Log in</button>
            <button onClick={() => this.props.dispatch(actions.changeForm(2))} type="button" id="signup-btn" className="btn btn-info">Sign up</button>
            </div>
        );
    }


    componentWillMount()
    {
      var self = this;
      sessionStorage.clear();
      this.props.dispatch(actions.fetchHistory());
    }

    // shouldComponentUpdate(nextProps, nextState){
    //   return this.props.mainStage !== nextProps.mainStage;
    // }

    render(){
        return(
            <div className="dashboard">
                <h1>Welcome to wallet</h1>
                {this.renderGroupButton()}
                <div className="button-group"></div>
                {this.renderForm()}
                <div id="alertMes" className="alert alert-danger" role="alert">
                    <strong>{this.props.errMes}</strong>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
      mainStage: state.mainData.mainStage,
      history: state.mainData.history,
      errMes: state.mainData.errMes,
    }
}

export default connect(mapStateToProps)(Dashboard);
