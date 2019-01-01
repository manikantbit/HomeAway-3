import React, { Component } from "react";
import Navbar from "../layout/navbar";
import axios from 'axios';
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../actions/actionCreators";

class Inbox extends Component {
   state = {
     messages:[]
   }
  componentDidMount() {
    let data = null;
    let obj = this;
    console.log("In component did mount")
    if(localStorage.getItem("type") ==="user"){
        data = { sender: localStorage.getItem("email"),type: "user" };
    }
    else {
        data = {receiver:localStorage.getItem("email"),type:"owner"}
    }
    //this.props.getMessage(data);
    axios.get('/messages',{params:data})
    .then(response=>{
      obj.props.getMessage(response)
      this.setState({message:response.data})
    })
  }
  navigate() {
    this.props.history.push("/usersearch");
  }
  render() {
    let redirectVar = null;
    let messages = null;
    let token = localStorage.getItem("token");
    if (token === "" || token == null) {
      redirectVar = <Redirect to="/" />;
    }
    if(this.props.login.type === "user"){
        messages =
      typeof this.state.message !== "undefined"
        ? this.state.message.map((msg, i) => (
            <tr key={i}>
              {console.log(msg, i)}
              <td>{msg.receiver}</td>
              <td>{msg.propertyID}</td>
              <td>{msg.propertyName}</td>
              <td>
                <Link to={`/msgDetail/${i}`}>
                  {msg.message.message.substring(0, 20)}
                  ..
                </Link>
              </td>
              <td>{msg.message1!=undefined? moment(msg.message1.createdDate).format("DD MMM YYYY HH:MM"):moment(msg.message.createdDate).format("DD MMM YYYY HH:MM")}</td>
            </tr>
          ))
        : null;
    } else {
         messages =
         typeof this.state.message !== "undefined"
        ? this.state.message.map((msg, i) => (
            <tr key={i}>
              {console.log(msg, i)}
              <td>{msg.sender}</td>
              <td>{msg.propertyID}</td>
              <td>{msg.propertyName}</td>
              <td>
                <Link to={`/msgDetail/${i}`}>
                  {msg.message.message.substring(0, 20)}
                  ..
                </Link>
              </td>
              <td>{msg.message1!=undefined ? moment(msg.message1.createdDate).format("DD MMM YYYY HH:MM"):moment(msg.message.createdDate).format("DD MMM YYYY HH:MM")}</td>
            </tr>
          ))
        : null;
    }
    return (
      <div className="container-fluid">
        {redirectVar}
        <Navbar logoFlag={true} navBlue={true} />
        <ul
          className="nav nav-pills"
          style={{ borderBottom: "1px solid #dfdfdf", marginBottom: "40px" }}
        >
          <li className="tab">
            <Link to="/inbox">Inbox</Link>
          </li>
          <li>
            <Link to="/mytrip">My trips</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="#">Account</Link>
          </li>
        </ul>
        <div className="messagebox" style={{ marginTop: "40px" }}>
          <ul class="nav nav-tabs">
            <li class="active">
              <a data-toggle="tab" href="#inbox">
                Inbox
              </a>
            </li>
            {/*<li>
              <a data-toggle="tab" href="#menu1">
                Sent
              </a>
            </li>*/}
          </ul>
          <div class="tab-content">
            <div id="inbox" class="tab-pane fade in active">
              <h3>Inbox</h3>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Sender/Sent to</th>
                    <th>Property ID</th>
                    <th>Property Name</th>
                    <th>Subject</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {messages}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="text-center">
          <i class="fas fa-suitcase" />
          <h4></h4>
          <button
            onClick={this.navigate.bind(this)}
            className="btn btn-primary"
          >
            Start your search
          </button>
        </div>
      </div>
    );
  }
}
Inbox.propTypes = {
  login: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { login: state.login, message: state.message.message };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox);
