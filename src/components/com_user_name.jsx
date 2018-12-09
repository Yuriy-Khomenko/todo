import React from 'react';

const textCenter = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
};

class UserName extends React.Component {

    render() {
        return <span style={textCenter}>
            {this.props.user_name}
        </span>;
    }
}

export default UserName;