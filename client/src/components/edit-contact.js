import React, { Component } from 'react';
import api from '../services/api';
import { setErrors } from './errors/error';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Swal from 'sweetalert2';
import { Button, Modal } from 'react-bootstrap';


class EditContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            contact_num: '',
            location: '',
            reg_date: '',
            errors: {},
            showHide: false,
        };
    }

    componentDidMount() {

        const con_id = this.props.match.params.id;

        api
            .get(`/contact/${con_id}`)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    fullname: res.data.fullname,
                    email: res.data.email,
                    contact_num: res.data.contact_num,
                    location: res.data.location,
                    reg_date: res.data.reg_date,
                });
            })
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [e.target.name]: e.target.value });
    }


    validate = (fullname, email, contact_num, location, reg_date) => {
        const errors = setErrors(fullname, email, contact_num, location, reg_date);
        this.setState({ errors: errors });
        this.handleModalShowHide();
        return Object.values(errors).every((err) => err === "");
    }

     
    handleModalShowHide = () => {
        this.setState({ showHide: !this.state.showHide })
    }

    onSubmit = () => {
        
        const con_id = this.props.match.params.id;
        const { fullname, email, contact_num, location, reg_date } = this.state;

        if (this.validate(fullname, email, contact_num, location, reg_date)) {

            const data = {
                fullname: this.state.fullname,
                email: this.state.email,
                contact_num: this.state.contact_num,
                location: this.state.location,
                reg_date: this.state.reg_date
            };

            api
                .put(`/contact/update/${con_id}`, data)
                .then((res) => {
                    if (res.data.success) {

                        this.setState({

                            fullname: '',
                            email: '',
                            contact_num: '',
                            location: '',
                            reg_date: '',

                        })
                    }
                    Swal.fire({
                        title: 'Updated Successfully !',
                        icon: 'success',
                        confirmButtonText: 'Okay'
                    })
                    this.props.history.push('/');
                })
                .catch(error => {
                    console.log(error.error);
                })
        }
    };

    render() {
        return (

            <div className="container">
                <Card sx={{ minWidth: 278 }}>
                    <CardContent>
                        <Link to="/" className="btn btn-sm btn-sucess">Show List</Link>
                        <form>
                            <p className="lead text-center">
                                Edit Contact
                            </p>
                            <div className="row">
                                <div className="col">
                                    <label className="">Fullname</label>
                                    <input
                                        type='text'
                                        placeholder='Last Name, First Name Middle Initial'
                                        name='fullname'
                                        className='form-control'
                                        value={this.state.fullname}
                                        onChange={this.onChange}
                                        noValidate
                                        readOnly
                                    />
                                    {this.state.errors.fullname && (
                                        <div style={{ fontSize: 8, color: 'red' }}><em>{this.state.errors.fullname}</em></div>
                                    )}
                                </div>
                                <div className="col">
                                    <label for="">Email Address</label>
                                    <input
                                        type='text'
                                        placeholder='example@gmail.com'
                                        name='email'
                                        className='form-control'
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        noValidate
                                    />
                                    {this.state.errors.email && (
                                        <div style={{ fontSize: 8, color: 'red' }}><em>{this.state.errors.email}</em></div>
                                    )}
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-4">
                                    <label for="">Contact Number</label>
                                    <input
                                        type='text'
                                        placeholder='99999999999'
                                        name='contact_num'
                                        className='form-control'
                                        value={this.state.contact_num}
                                        onChange={this.onChange}
                                        noValidate
                                    />
                                    {this.state.errors.contact_num && (
                                        <div style={{ fontSize: 8, color: 'red' }}><em>{this.state.errors.contact_num}</em></div>
                                    )}
                                </div>
                                <div className="col-4">
                                    <label for="">Location</label>
                                    <select type='text' name='location' value={this.state.location} className="custom-select  form-control" onChange={this.onChange}>
                                        <option selected disabled hidden></option>
                                        <option value="Cebu">Cebu</option>
                                        <option value="Manila">Manila</option>
                                    </select>
                                    {this.state.errors.location && (
                                        <div style={{ fontSize: 8, color: 'red' }}><em>{this.state.errors.location}</em></div>
                                    )}
                                </div>
                                <div className="col-4">
                                    <label for="">Register Date</label>
                                    <input
                                        type="text"
                                        name='reg_date'
                                        className='form-control'
                                        value={this.state.reg_date}
                                        onChange={this.onChange}
                                        readOnly
                                        
                                    />
                                    {this.state.errors.reg_date && (
                                        <div style={{ fontSize: 8, color: 'red' }}><em>{this.state.errors.reg_date}</em></div>
                                    )}
                                </div>
                            </div>
                            <br /> 
                            <div class="d-flex flex-row mt-3">
                                <div class="p-1">
                                    <a href="/" className="btn btn-sm btn-primary">Back</a>
                                </div>
                                <div class="p-1">
                                    <Button variant="success" className="btn btn-sm" onClick={() => this.handleModalShowHide()}>
                                        Save
                                    </Button>

                                    <Modal show={this.state.showHide}>
                                        <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                                            <Modal.Title>Update Record</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Are you sure you want to update this record?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="success" className="btn btn-sm" onClick={() => this.onSubmit()}>
                                                Yes
                                            </Button>
                                            <Button variant="danger" className="btn btn-sm" onClick={() => this.handleModalShowHide()}>
                                                No
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default EditContact;
