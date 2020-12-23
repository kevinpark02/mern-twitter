import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="login-links">
          <Link className="user-links" to={"/tweets"}>All&nbsp;Tweets</Link>
          <Link className="user-links" to={"/profile"}>Profile</Link>
          <Link className="user-links" to={"/new_tweet"}>Write&nbsp;a&nbsp;Tweet</Link>
          <button className="user-links" onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="signout-links">
          <Link className="session-links" to={"/signup"}>Signup</Link>
          <Link className="session-links" to={"/login"}>Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="navbar-cont">
        <h1>Chirper</h1>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;
