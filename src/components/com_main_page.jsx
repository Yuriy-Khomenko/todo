import React from 'react';
import TaskItem from './com_task_item.jsx';

var Style = {
    width: '45px'
};

class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            curent_page: this.props.page
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.page !== prevProps.page) {
            this.setState({ curent_page: this.props.page });
        }
    }

    componentDidMount() {
        this.getTasks();
    }

    onChangeCountPage = (e) => {
        this.setState({ curent_page: e.target.value })
    }

    onFocusOutCountPage = (e) => {

        this.props.changePage(
            {
                page: e.target.value,
                sort_direction: this.props.sort_direction,
                sort_field: this.props.sort_field
            }
        );
    }

    getTasks = () => {
        this.props.onFetch({
            page: this.props.page,
            sort_direction: this.props.sort_direction,
            sort_field: this.props.sort_field
        }
        );
    }

    onInPage = () => {
        this.props.changePage(
            {
                page: Number(this.props.page) + 1,
                sort_direction: this.props.sort_direction,
                sort_field: this.props.sort_field
            }
        );
    }

    onDecPage = () => {
        if (this.props.page === 1) {
            return;
        }
        this.props.changePage(
            {
                page: Number(this.props.page) - 1,
                sort_direction: this.props.sort_direction,
                sort_field: this.props.sort_field
            }
        );
    }

    onForvard = () => {
        this.props.changePage(
            {
                page: Math.ceil(this.props.total_task_count / 3),
                sort_direction: this.props.sort_direction,
                sort_field: this.props.sort_field
            }
        );
    }

    onBack = () => {
        if (this.props.page === 1) {
            return;
        }
        this.props.changePage(
            {
                page: 1,
                sort_direction: this.props.sort_direction,
                sort_field: this.props.sort_field
            }
        );
    }

    onChangeSort = (val) => {

        let field_setting = {
            page: this.props.page,
            sort_direction: this.props.sort_direction,
            sort_field: this.props.sort_field
        };

        if (this.props.sort_field === val) {
            this.props.sort_direction === 'asc' ?
                (field_setting.sort_direction = 'desc')
                :
                (field_setting.sort_direction = 'asc')
        } else {
            field_setting.sort_field = val;
        }
        this.props.changePage(field_setting);
    }

    render() {

        let tasks = [];
        let item;

        if (this.props.tasks) {
            for (let i = 0; i < this.props.tasks.length; i++) {
                item = this.props.tasks[i];
                tasks.push(<TaskItem
                    key={item.id}
                    task={item}
                    onFetch={this.props.onFetch}
                    admin={this.props.admin}
                />);
            }
        }

        return <div className={"container "}>
            <div className={"row justify-content-center"}>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr className="table-warning">
                            <th onClick={() => this.onChangeSort('id')}>#</th>
                            <th onClick={() => this.onChangeSort('username')}>КОРИСТУВАЧ</th>
                            <th onClick={() => this.onChangeSort('email')}>E-MAIL</th>
                            <th>ТЕКСТ ЗАДАЧІ</th>
                            <th>КАРТИНКИ</th>
                            <th>УПРАВЛІННЯ</th>
                            <th onClick={() => this.onChangeSort('status')}>ВИКОНАНО</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks}
                    </tbody>
                </table>
            </div>

            <div className={"row justify-content-end"}>

                <button onClick={this.onBack} className={"btn btn-success m-2"} type="button">
                    &#8656;
        </button>
                <button onClick={this.onDecPage} className={"btn btn-success m-2"} type="button">
                    &#8592;
                </button>
                <input type="text"
                    style={Style}
                    className="form-control m-2"
                    value={this.state.curent_page}
                    onBlur={this.onFocusOutCountPage}
                    onChange={this.onChangeCountPage}
                />

                <button onClick={this.onInPage} className={"btn btn-success m-2"} type="button">
                    &#8594;
                </button>
                <button onClick={this.onForvard} className={"btn btn-success m-2"} type="button">
                    &#8658;
            </button>
            </div>
        </div>;
    }
}

export default MainPage;