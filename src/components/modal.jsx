import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';



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
        this.props.onFetch({
            status: this.state.status,
            task: this.state.task,
            id: this.props.id
        }, true);

        this.toggle();
    };

    onChangeText = (e) => { this.setState({ task: e.target.value }) }

    render() {

        return (
            <div>
                <Button disabled={!this.props.admin} color="primary" className={"m-2"} onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle}>ЗМІНА ЗАДАЧІ</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="newTask">нова задача:</Label>
                            <Input value={this.state.task} type="text" name="email" id="newTask" onChange={this.onChangeText} />
                        </FormGroup>
                        <FormGroup check inline>
                            <Label check>
                                <Input checked={this.state.status === 10} onChange={this.onCheck} type="checkbox" /> завдання виконано
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