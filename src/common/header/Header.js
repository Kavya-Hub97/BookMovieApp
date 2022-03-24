import React, { Component } from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import {Link} from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';
import PropTypes from 'prop-types';

const cssStyles = {
    content: {
        top: '50%',
        bottom: 'auto',
        left: '50%',
        right: 'auto',
        rightMargin: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
}

class Header extends Component {
    constructor(props) {
        const getLoggedInUser = () => {
            if(sessionStorage.getItem('access-token')!=null){
                return true;
            } else {
                return false;
            }
        }
    super(props);
    this.state={
        isUserLoggedIn:getLoggedInUser(),
        openPopUp:false,
        register:false,
        value:0,
        username:"",
        usernameReg: "none",

        password:"",
        passwordReg: "none",

        firstname:"",
        firstnameReg:"none",

        lastname:"",
        lastnameReg:"none",

        email:"",
        emailReg:"none",

        contactno:"",
        contactReg:"none",

        successRegistration:false,
        
    };
        this.openLoginModalHandler = this.openLoginModalHandler.bind(this);
        this.closeLoginModalHandler = this.closeLoginModalHandler.bind(this);
        this.tabComponentHandler = this.tabComponentHandler.bind(this);
        this.registerFirstnameHandler = this.registerFirstnameHandler.bind(this);
        this.registerLastnameHandler = this.registerLastnameHandler.bind(this);
        this.registerEmailHandler = this.registerEmailHandler.bind(this);
        this.registerEmailPasswordHandler = this.registerEmailPasswordHandler.bind(this);
        this.registerContactNoHandler = this.registerContactNoHandler.bind(this);
        this.usernameHandler = this.usernameHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.loginSelectHandler = this.loginSelectHandler.bind(this);
        this.registerTabHandler = this.registerTabHandler.bind(this);
    }

closeLoginModalHandler(){
    this.setState({ openPopUp: false })
}
openLoginModalHandler(){
   this.setState({ openPopUp: true});
};
logoutHandler(){
        console.log(sessionStorage.getItem('access-token'));
        sessionStorage.removeItem('uuid');
        sessionStorage.removeItem('access-token');
        this.setState({ isUserLoggedIn: false })
}
tabComponentHandler(event,value){
    this.setState({ value });
}
loginSelectHandler(){
    if( this.state.username === ""){
        this.setState({ username: "displayBlock" });
    }else{
        this.setState({ username: "displayNone" });
    }
    if(this.state.password === ""){
        this.setState({ password: "displayBlock" });
    }else{
        this.setState({ password: "displayNone" });
    }
    if (this.state.username === "" || this.state.password === "") {
         return
         }
    let that = this;
    let xhttp;
    let userLogin = JSON.stringify({
        "username": this.state.username,"password": this.state.password
    })
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(xhttp.getResponseHeader('access-token'));

            sessionStorage.setItem('uuid', JSON.parse(this.responseText).id);
            sessionStorage.setItem('access-token', xhttp.getResponseHeader('access-token'));

            that.setState({ isUserLoggedIn: true });
            that.closeLoginModalHandler();
        }
    }
    xhttp.open("POST", this.props.urlLink + "auth/login");
    xhttp.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.username + ":" + this.state.password));
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Cache-Control", "no-cache");
    xhttp.send(userLogin);
}
usernameHandler(e){
    this.setState({ username: e.target.value })
}
passwordHandler(e){
    this.setState({ password: e.target.value })
}
registerTabHandler(){
    if(this.state.firstnameReg === ""){
        this.setState({ firstnameReg: "displayBlock" })
    }else{
        this.setState({ firstnameReg: "displayNone" });
    }
    if(this.state.lastnameReg === "" ){
        this.setState({ lastnameReg: "displayBlock" })
    }else{
        this.setState({ lastnameReg: "displayNone" });
    }
    if(this.state.emailReg === "" ){
        this.setState({ emailReg: "displayBlock" })
    }else{
        this.setState({ emailReg: "displayNone" });
    }
    if( this.state.passwordReg === ""){
        this.setState({ passwordReg: "displayBlock" })
    }else{
        this.setState({ passwordReg: "displayNone" });
    }
    if(this.state.contactReg === ""){
        this.setState({ contactReg: "displayBlock" })
    }else{
        this.setState({ contactReg: "displayNone" })
    }
    if( this.state.firstnameReg === "" || this.state.lastnameReg === "" || this.state.emailReg === "" || this.state.passwordReg === "" || this.state.contactReg === ""){
        return;
    }
    let that = this;
    let signUpPage = JSON.stringify({
        "first_name": this.state.firstnameReg, "last_name": this.state.lastnameReg, "email_address": this.state.emailReg,"password": this.state.passwordReg,
        "mobile_number": this.state.contactReg
    })
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 201) {
                console.log(this.responseText);
                that.setState({ successRegistration: true })
            }
        }
        xhttp.open("POST", this.props.urlLink + "signup");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Cache-Control", "no-cache");
        xhttp.send(signUpPage);
}
registerFirstnameHandler(e){
    this.setState({ firstnameReg: e.target.value })
}
registerLastnameHandler(e){
    this.setState({ lastnameReg: e.target.value })
}
registerEmailHandler(e){
    this.setState({ emailReg: e.target.value })
}
registerEmailPasswordHandler(e){
    this.setState({ passwordReg: e.target.value })
}
registerContactNoHandler(e){
    this.setState({ contactReg: e.target.value })
}


render() {
    let button;
    let bookButton;
    if(this.state.isUserLoggedIn){
         button = <Button variant="contained" onClick={this.logoutHandler}>Logout</Button> 
    }else{
        button = <Button variant="contained" onClick={this.openLoginModalHandler}>Login</Button>
    }


    let bookshow_button;
    let book_button;
    if(this.props.showBookShowButton === "true" && !this.state.isUserLoggedIn){
        bookshow_button = <Button variant="contained" onClick={this.openLoginModalHandler} color="primary" className='bookShowButton'>
            BOOK SHOW
        </Button>
    }
    if(this.props.showBookShowButton === "true" && this.state.isUserLoggedIn){
        book_button=<Link to = {"/bookshow/" + this.props.id}>
            <Button variant="contained" color="primary" className='bookShowButton'>
                BOOKSHOW
            </Button>
        </Link>
    }
        
    return (
    <div>
        <div className="header">
            <div className="logoIcon">
                <img src={logo} className='logoIcon' alt='logo'/>
            </div>
    
            <div className="login_button">
                {button}
                {bookButton}
            </div>

            <div className="bookShowButton">
                {bookshow_button}
                {book_button}
            </div>

        </div>
    
    <Modal ariaHideApp={false} isOpen={this.state.openPopUp} contentLabel="Login" onRequestClose={this.closeLoginModalHandler} style={cssStyles}>
    <Tabs className="multiple_tabs" value={this.state.value} onChange={this.tabComponentHandler}>
        <Tab label="Login"/>
        <Tab label="Register"/>
    </Tabs>

        {this.state.value === 0 && <TabContainer>
        <FormControl loginusername>
            <InputLabel placeholder="username">Username *</InputLabel>
            <Input type="text" id="username" username={this.state.username} onChange={this.usernameHandler}></Input>
            <FormHelperText className={this.state.usernameReg}><span className="red">required</span></FormHelperText>
        </FormControl><br/><br/>

        <FormControl loginpassword>
            <InputLabel placeholder="password">Password *</InputLabel>
            <Input type="password" id="password" password={this.state.password} onChange={this.passwordHandler.bind(this)}></Input>
            <FormHelperText className={this.state.passwordReg}><span className="red">required</span></FormHelperText>
        </FormControl><br/><br/>
            <Button variant="contained" color="primary" onClick={this.loginSelectHandler}>LOGIN</Button>
    </TabContainer>}

        {this.state.value === 1 && <TabContainer>

        <FormControl registerfirstname>
            <InputLabel placeholder="first Name">First Name *</InputLabel>
            <Input type="firstname" id="firstname" onChange={this.registerFirstnameHandler}></Input>
            <FormHelperText className={this.state.firstnameReg}><span className="red">required</span></FormHelperText>
        </FormControl><br/><br/>

        <FormControl registerlastname>
            <InputLabel placeholder="last Name">Last Name *</InputLabel>
            <Input type="lastname" id="lastname" onChange={this.registerLastnameHandler}></Input>
            <FormHelperText className={this.state.lastnameReg}><span className="red">required</span></FormHelperText>
        </FormControl><br/><br/>

        <FormControl registeremailid>
            <InputLabel placeholder="email">Email *</InputLabel>
            <Input type="email" id="email" onChange={this.registerEmailHandler} pattern=".+@[mM][aA][iI][lL][fF][oO][rR][aA][lL][lL][.][cC][oO][mM]"></Input>
            <FormHelperText className={this.state.emailReg}><span className="red">required</span></FormHelperText>
        </FormControl><br/><br/>

        <FormControl registeremailpassword>
            <InputLabel placeholder="passwordReg">Password *</InputLabel>
            <Input type="password" id="passwordReg" onChange={this.registerEmailPasswordHandler}></Input>
            <FormHelperText className={this.state.passwordReg}><span className="red">required</span></FormHelperText>
        </FormControl><br/><br/>

        <FormControl registercontactno>
            <InputLabel placeholder="contact No">Contact No *</InputLabel>
            <Input type="tel" id="contactno" onChange={this.registerContactNoHandler} pattern="[789][0-9]{9}"></Input>
            <FormHelperText className={this.state.contactReg}><span className="red">required</span></FormHelperText>
        </FormControl><br/><br/>

            {this.state.successRegistration === true &&
        <FormControl successpop>
            <span className="successMessage">Registration Successful. Please Login!</span>
        </FormControl>}<br/><br/>
            <Button variant="contained" color="primary" onClick={this.registerTabHandler}>REGISTER</Button>
    </TabContainer>}
    
    </Modal> 
    </div>
    )
}
}


export default Header;