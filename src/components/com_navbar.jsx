import React from 'react';
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
        return <div className={"d-flex justify-content-between navbar"}>
            <div>
                <nav className={"navbar navbar-light bg-faded"}>
                    <div className={"form-inline"}>

                        <Link to='/todo'>
                            <button className={"btn btn-success m-2"} type="button">
                                СПИСОК
                            </button>
                        </Link>

                        <Link to='/todo/create'>
                            <button className={"btn  btn-info m-2"} type="button">
                                ДОДАТИ...
                        </button>
                        </Link>

                    </div>
                </nav>
            </div>

            {this.props.is_loading && <div className={"loader loader-size"} />}

            <div className={"d-flex justify-content-between "}>
                <UserName user_name={this.props.user_name} />
                {this.props.is_admin ?
                    <button onClick={this.props.onUnLog} className={"btn  btn-warning m-2"} type="button">
                        ВИХІД
                    </button>
                    :
                    <Link to='/todo/userlog'>
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