import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import md5 from 'md5';


class ModalWin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            task: this.props.task,
            status: this.props.status
        };
    }

    onCheck = ({ target: { checked } }) => {
        this.setState({ status: checked ? 10 : 0 });
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    save = () => {
        let str_URI = "status=" + this.state.status + "&text=" + encodeURIComponent(this.state.task) + "&token=beejee";
        let str_md5 = md5(str_URI);

        let data = new FormData();
        data.append("status", this.state.status);
        data.append("text", encodeURIComponent(this.state.task));
        data.append("token", "beejee");
        data.append("signature", str_md5);

        str_URI = 'https://uxcandy.com/~shapoval/test-task-backend/edit/' + this.props.id + 'id?developer=Yuriy';

        this.props.onFetch(str_URI, data, 'POST');

        this.toggle();
    };

    onChangeText = (e) => { this.setState({ task: e.target.value }) }

    render() {

        return (
            <div>
                <Button disabled={!this.props.admin} color="primary" className={"m-2"} onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>ЗМІНА ЗАДАЧІ</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="newTask">нова задача:</Label>
                            <Input value={this.state.task} type="text" name="email" id="newTask" onChange={this.onChangeText} />
                        </FormGroup>
                        <FormGroup check inline>
                            <Label check>
                                <Input  checked={this.state.status == 10}  onChange={this.onCheck} type="checkbox" /> завдання виконано
                        </Label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.save}>зберегти</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>відмінити</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalWin;