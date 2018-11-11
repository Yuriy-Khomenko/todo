import React, { Component } from 'react';
import TaskItem from './com_task_item.jsx';

var Style = {
    width: '45px'
};

class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            curent_page: this.props.curent_page,
            sort_direction: this.props.sort_direction,
            sort_field: this.props.sort_field,
            update: this.props.update
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.update !== this.props.update) {
            if (this.props.update == true) {
                this.getTasks();
            }
        }
    }
    componentDidMount() {
        this.getTasks();
    }

    onChangeCountPage = (e) => { this.setState({ curent_page: e.target.value }) }

    getTasks = (page, cal) => {
        this.props.onFetch('https://uxcandy.com/~shapoval/test-task-backend/?developer=Yuriy&page=' + this.state.curent_page
            + '&sort_direction=' + this.state.sort_direction
            + '&sort_field=' + this.state.sort_field
        );
    }

    onInPage = () => {
        this.setState({ curent_page: this.state.curent_page + 1 }, this.getTasks);
    }

    onDecPage = () => {
        if (this.state.curent_page == 1) {
            return;
        }
        this.setState({ curent_page: this.state.curent_page - 1 }, this.getTasks);
    }


    onChangeSort = (val) => {
        if (this.state.sort_field === val) {
            this.state.sort_direction === 'asc' ?
                this.setState({ sort_direction: 'desc' }, this.getTasks)
                :
                this.setState({ sort_direction: 'asc' }, this.getTasks)
        } else {
            this.setState({ sort_field: val }, this.getTasks)
        }
    }

    render() {

        let arr = [];
        let item;

        if (this.props.tasks) {
            for (let i = 0; i < this.props.tasks.length; i++) {
                item = this.props.tasks[i];
                arr.push(<TaskItem key={item.id} task={item} onFetch={this.props.onFetch} admin={this.props.admin} />);
            }
        }

        return <div className={"container "}>
            <div className={"row justify-content-start"}>

                <table className="table table-striped table-bordered">
                    <thead>
                        <tr className="table-warning">
                            <th onClick={() => this.onChangeSort('id')}>#</th>
                            <th onClick={() => this.onChangeSort('username')}>КОРИСТУВАЧ</th>
                            <th onClick={() => this.onChangeSort('email')}>E-MAIL</th>
                            <th>ТЕКСТ ЗАДАЧІ</th>
                            <th>КАРТИНКИ</th>
                            <th>УПРАВЛІННЯ</th>
                            <th>ВИКОНАННЯ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr}
                    </tbody>
                </table>
            </div>

            <div className={"row justify-content-end"}>

                <button onClick={this.onDecPage} className={"btn btn-success m-2"} type="button">
                    &#8592;
                </button>
                <input type="text" style={Style} className="form-control m-2" value={this.state.curent_page} min="1" max="100" />
                <button onClick={this.onInPage} className={"btn btn-success m-2"} type="button">
                    &#8594;
                </button>
            </div>
        </div>;
    }
}

export default MainPage;