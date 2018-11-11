import React, { Component } from 'react';
import { Link } from "react-router-dom";
import UserName from './com_user_name';


class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.set_total_count = this.set_total_count.bind(this);
    }

    set_total_count(new_value) {
    }

    render() {
        return <div className={"d-flex justify-content-start"}>
            <div>
                <nav className={"navbar navbar-light bg-faded"}>
                    <div className={"form-inline"}>

                        <Link to='/'>
                            <button className={"btn btn-success m-2"} type="button">
                                СПИСОК
                            </button>
                        </Link>

                        <Link to='/create'>
                            <button className={"btn  btn-info m-2"} type="button">
                                ДОДАТИ...
                        </button>
                        </Link>

                    </div>
                </nav>
            </div>

            <div className={"d-flex justify-content-between mr-5 ml-auto"}>
                <UserName user_name={this.props.user_name} />
                {this.props.is_admin ?
                    <button onClick={this.props.onUnLog} className={"btn  btn-warning m-2"} type="button">
                        ВИХІД
                    </button>
                    :
                    <Link to='/userlog'>
                        <button className={"btn  btn-warning m-2"} type="button">
                            ВХІД
                    </button>
                    </Link>
                }
            </div>

        </div>;
    }
}

export default NavBar;