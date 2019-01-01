import React,{Component} from 'react';
import Navbar from '../layout/navbar';
import {Link} from 'react-router-dom';

class UserTab extends Component {
    render() {
        return (
            <div className='container-fluid'>
            <Navbar logoFlag={true}/>
            <ul className="nav nav-pills">
            <li className={ (this.props.path === '/inbox') ? 'tab' : '' }><Link to="/inbox">Inbox</Link></li>
            <li className={ (this.props.path === '/mytrip') ? 'tab' : '' }><Link to="/mytrip">My trips</Link></li>
            <li className={ (this.props.path === '/profile') ? 'tab' : '' }><Link to="/profile">Profile</Link></li>
            <li className={ (this.props.path === '/account') ? 'tab' : '' }><Link to="#">Account</Link></li>
            </ul>
            </div>
        )

    }
}
export default UserTab;