import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
    renderButtons = () => {
        if(this.props.authenticated){
            return <Link to="/signout">Sign out</Link>
        }else{
            return [
                <Link to="/signin" key={1}>Sign in</Link>,
                <Link to="/signup" key={2}>Sign up</Link>
            ];
        }
    };

    render(){
        return(
            <header id="navigation">
                <div id="logo"></div>
                <div id="navigation-links">
                    <Link to="/">Home Page</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </div>
                <div id="navigation-buttons">
                    { this.renderButtons() }
                </div>
            </header>
        )
    };
};

const mapStateToProps = (state) => {
    return{
        authenticated: state.authentication.authenticated
    };
};

export default connect(mapStateToProps)(Header);
