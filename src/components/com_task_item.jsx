import React from 'react';
import ModalWin from './modal.jsx';


class TaskItem extends React.Component {

    render() {
        return <tr>
            <th scope="row">{this.props.task.id}</th>
            <td>{this.props.task.username}</td>
            <td>{this.props.task.email}</td>
            <td>{this.props.task.text}</td>
            <td>
                <img width="90" height="70" src={this.props.task.image_path} alt="картинка" />
            </td>
            <td>
                <div className={"d-flex justify-content-center"}>
                    <ModalWin buttonLabel={"редагування"}
                        task={this.props.task.text}
                        id={this.props.task.id}
                        status={this.props.task.status}
                        onFetch={this.props.onFetch}
                        admin={this.props.admin}
                    />
                </div>
            </td>
            <td>
                <div className="custom-control custom-checkbox">
                    <input disabled="1" type="checkbox" checked={this.props.task.status === 10} className="custom-control-input" id={"customCheck_" + this.props.task.id} /><label className="custom-control-label" htmlFor={"customCheck_" + this.props.task.id}></label>
                </div>
            </td>
        </tr>;
    }
}

export default TaskItem;