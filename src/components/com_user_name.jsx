import React, { Component } from 'react';

const textCenter = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
};

class UserName extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <span style={textCenter}>
            {this.props.user_name}
        </span>;
    }
}

export default UserName;