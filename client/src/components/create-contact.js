import React, { Component } from 'react';
import api from './../services/api'
import { setErrors } from '../components/errors/error';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Moment from 'moment';
import Swal from 'sweetalert2';

class CreateContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            contact_num: '',
            location: '',
            reg_date: '',
            errors: {}
        };
    }

    onChange = (e) => {
        // const { name, value } = e.target;
        this.setState({ [e.target.name]: e.target.value });
    }

    validate = (fullname, email, contact_num, location, reg_date) => {
        const errors = setErrors(fullname, email, contact_num, location, reg_date);
        this.setState({ errors: errors });
        return Object.values(errors).every((err) => err === "");
    }

    onSubmit = e => {
        e.preventDefault()

        const { fullname, email, contact_num, location, reg_date } = this.state;
        
        //validates data before storing it to the database.
        if (this.validate(fullname, email, contact_num, location, reg_date)) {

            //Formatting the user's input date
            this.state.reg_date = Moment().format('MM/DD/YYYY');

            const data = {
                fullname: this.state.fullname,
                email: this.state.email,
                contact_num: this.state.contact_num,
                location: this.state.location,
                reg_date: this.state.reg_date
            };
            
            api
                .post('/contact/create', data)
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
                        title: 'Added Successfully !',
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
                <Card sx={{ minWidth: 300 }}>
                    <CardContent>
                        <form>
                            <p className="lead text-center">
                                Create New Contact
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
                                    <select type='text' name='location' value={this.state.value} className="custom-select form-control lead" onChange={this.onChange}>
                                        <option selected hidden > Select Location</option>
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
                                        type='date'
                                        min={new Date().toJSON().slice(0, 10).replace(/-/g, '/')}
                                        name='reg_date'
                                        className='form-control'
                                        value={this.state.reg_date}
                                        onChange={this.onChange}
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
                                    <button type="submit" className="btn btn-sm btn-success " onClick={this.onSubmit} >Save</button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default CreateContact;
