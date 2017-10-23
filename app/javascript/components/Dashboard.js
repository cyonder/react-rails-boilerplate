import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUsers } from '../actions/user';

class Dashboard extends Component {

    componentDidMount(){
        this.props.fetchUsers();
    };

    render(){
        return(
            <div>
                <span>You are in Dashboard Page</span>
            </div>
        )
    };
};

export default connect(null, { fetchUsers })(Dashboard);
