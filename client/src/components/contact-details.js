import React, { Component } from 'react';
import api from './../services/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

class ContactDetails extends Component {
    constructor(props) {
        super(props);

    
        // Setting up state
        this.state = {
            contact: [],
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
                            <hr/> 
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
                        </form>
                        <hr/>
                        <a href="/" className="btn btn-sm btn-primary"> Back </a>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default ContactDetails;