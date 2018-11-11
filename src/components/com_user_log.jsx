import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class UserLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: "",
            pass: ""
        };
        this.onChangeName = (e) => { this.setState({ name: e.target.value }) };
        this.onChangePass = (e) => { this.setState({ pass: e.target.value }) };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {

        return (
            <div className="container">
                <div className="row m-2 justify-content-center">
                    <label className="col-2 col-form-label">логін:</label>
                    <div className="col-3">
                        <input className="form-control" type="text" id="name" value={this.state.name} onChange={this.onChangeName} />
                    </div>
                </div>

                <div className="row m-2 justify-content-center">
                    <label className="col-2 col-form-label">пароль:</label>
                    <div className="col-3">
                        <input className="form-control" type="password" id="pass" value={this.state.pass} onChange={this.onChangePass} />
                    </div>
                </div>

                <br />

                <div className="row col-12 justify-content-center">
                    <Button onClick={
                        () => {

                            let name = document.getElementById("name").value;
                            let pass = document.getElementById("pass").value;
                            if (name && pass) {

                                this.props.onUserLog(this.state.name, this.state.pass);
                            } else {
                                this.toggle();
                            }
                        }
                    }
                        className={"bg-success m-2"} >
                        ВВІЙТИ
                </Button>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>ПОМИЛКА</ModalHeader>
                        <ModalBody>
                            не заповнені всі поля
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>OK</Button>
                        </ModalFooter>
                    </Modal>

                </div >
            </div >
        );
    }
}

export default UserLog;