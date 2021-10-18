import React, { Component } from 'react';
import api from './../services/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Swal from 'sweetalert2';
import { Button, Modal } from 'react-bootstrap';

class DeleteContact extends Component {
    constructor(props) {
        super(props);

        // Setting up state
        this.state = {
            contact: [],
            showHide: false,
        };
    }

    componentDidMount() {

        const con_id = this.props.match.params.id;

        console.log(con_id);

        api
            .get(`/contact/${con_id}`)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    contact: res.data,
                });

                console.log("contact : ", this.state.contact);

            }).catch(error => {
                console.log(error.error);
            })
    }

    onDelete = () => {

        const id = this.props.match.params.id;
        api
            .delete(`/contact/${id}`)
            .then((res) => {
                console.log(res);
            })
            Swal.fire({
                title: 'Deleted Successfully !',
                icon: 'success',
                confirmButtonText: 'Exit'
            })
        this.props.history.push('/');

    }

    handleModalShowHide = () => {
        this.setState({ showHide: !this.state.showHide })
    }

    render() {

        const { fullname, email, contact_num, location, reg_date } = this.state.contact;

        return (
            <div className='container'>
                <Card sx={{ minWidth: 300 }}>
                    <CardContent>

                        <form>
                            <p className="lead text-center">
                                Contact Detail
                            </p>
                            <hr />
                            <div className="row">
                                <div className="col-4">
                                    <label className="">Fullname : {fullname}</label>
                                </div>
                                <div className="col-4">
                                    <label for="">Email Address : {email} </label>
                                </div>
                                <div className="col-4">
                                    <label for="">Contact Number: {contact_num}</label>
                                </div>
                            </div>

                            <br />

                            <div className="row">
                                <div className="col-4">
                                    <label for="">Location : {location}</label>
                                </div>
                                <div className="col-4">
                                    <label for="">Register Date : {reg_date}</label>
                                </div>
                            </div>
                            <hr />
                        </form>

                        <div class="d-flex flex-row mt-3">
                            <div class="p-2">
                                <a href="/" className="btn btn-sm btn-primary">Back</a>
                            </div>
                            <div class="p-2">
                                <Button variant="danger" className="btn btn-sm" onClick={() => this.handleModalShowHide()}>
                                    Delete
                                </Button>

                                <Modal show={this.state.showHide}>
                                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                                        <Modal.Title>Delete Record</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="success" className="btn btn-sm" onClick={() => this.onDelete()}>
                                            Yes
                                        </Button>
                                        <Button variant="danger" className="btn btn-sm" onClick={() => this.handleModalShowHide()}>
                                            No
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default DeleteContact;