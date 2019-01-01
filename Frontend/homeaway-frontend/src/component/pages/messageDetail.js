import React, { Component } from "react";
import Navbar from "../layout/navbar";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../actions/actionCreators";

class MessageDetail extends Component {
    state = {
        msg:null
    }
  goback() {
    this.props.history.push("/inbox");
  }
  navigate() {
    this.props.history.push("/usersearch");
  }
  send = async () => {
    let value = document.querySelector('[name="description"]').value
    let messageindex = parseInt(this.props.match.params.msgid)
    let data = {
        msgid:this.props.message[messageindex].msgid,
        message: value,
        createdDate: Date.now(),
        type:"owner"
    }
    await this.props.sendMessage(data)
    this.setState({msg:"Message sent successfully"})       
}
  render() {
    let redirectVar = null;
    let token = localStorage.getItem("token");
    if (token === "" || token == null) {
      redirectVar = <Redirect to="/" />;
    }
    let messageindex = parseInt(this.props.match.params.msgid)
    let messageowner = this.props.message[messageindex].message1!=undefined? (
        <div className="messageBox col-sm-offset-3 col-sm-6 col-sm-offset-3" style= {{backgroundColor:'white',borderBottom:'1px solid black' }}>
            <h4>From: {this.props.message[messageindex].receiver}</h4>
            <h4>To: {this.props.message[messageindex].sender}</h4>
            <h4>Date: {moment(this.props.message[messageindex].message1.createdDate).format('DD MMM YYYY HH:MM')}</h4>
            <h4>Message:</h4>
            <p><strong>{this.props.message[messageindex].message1.message}</strong></p>
        </div>
    ) :null
    let messageDetail = (
        <div className="messageBox col-sm-offset-3 col-sm-6 col-sm-offset-3" style= {{backgroundColor:'white' }}>
            <h4>From: {this.props.message[messageindex].sender}</h4>
            <h4>To: {this.props.message[messageindex].receiver}</h4>
            <h4>Date: {moment(this.props.message[messageindex].message.createdDate).format('DD MMM YYYY HH:MM')}</h4>
            <h4>Message:</h4>
            <p><strong>{this.props.message[messageindex].message.message}</strong></p>
        </div>
    )
    let reply =  ( 
        <div>
        <button className="btn btn-link btn-lg" data-toggle="modal" data-target="#myModal">Reply</button>
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Reply to your customer</h4>
                        </div>
                        <div className='text-success'>
                        {this.state.msg}
                        </div>
                        <div className="modal-body">
                        <input type="textbox" className="form-control" rows="5" placeholder="Your message...(optional)" name = "description" id="description"/>
                        </div>
                        <div className="modal-footer">
                        <button onClick={this.send} className="btn btn-primary">Send Message</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
    )
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
              <Link to='#inbox' data-toggle="tab">
                Inbox
              </Link>
            </li>
          </ul>
          
          <h3 className="text-center">Message Details</h3>
          {messageowner}
          {messageDetail}
          </div>
          <div className="text-center col-sm-12" style={{display:'inline-block',marginBottom:'30px'}}>
          {this.props.login.type ==="owner" ? reply :null}
          </div>
          <div className="text-center col-sm-12" style={{display:'inline-block'}}>
            <Link to="/inbox" style={{padding:"30px"}}>Back to Messages</Link>
        </div>
        <div className="text-center col-sm-12" style={{marginTop:'30px',display:'block'}}>
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
MessageDetail.propTypes = {
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
)(MessageDetail);
