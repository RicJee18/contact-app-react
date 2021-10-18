import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../services/api';
import { BsFillPersonPlusFill, BsFillEyeFill, BsTrashFill } from "react-icons/bs";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FaEdit } from "react-icons/fa";
import { DataGrid } from '@mui/x-data-grid';


//this is for the header of the table
const columns = [
    { field: '_id', headerName: 'ID', width: 82 },
    { field: 'fullname', headerName: 'Full Name', width: 130 },
    { field: 'contact_num', headerName: 'Contact No.', width: 130 },
    { field: 'location', headerName: 'Location', width: 100 },
    { field: 'reg_date', headerName: 'Register Date', width: 130 },
    { field: 'email', headerName: 'Email Address', width: 130 },
    {
        field: '',
        headerName: 'Action',
        width: 130,
        renderCell: (params) => {
            return (
                <>
                    <a href={`/contact/${params.row._id}`} className="m-2" style={{ color: '#2196f3' }}><BsFillEyeFill /></a>
                    <a href={`/update/${params.row._id}`} className="m-2" style={{ color: 'green' }}> < FaEdit /></a>
                    <a href={`/delete/${params.row._id}`} className="m-2"  style={{ color: 'red' }}>< BsTrashFill /></a>
                </>
            );
        },
    }
];

class ShowContacts extends Component {

    constructor(props) {
        super(props);

        this.header = columns;
        this.state = {
            contacts: [],
        };
    }
    
    //fetching all data from the database
    componentDidMount() {
        api
            .get('/contact')
            .then(res => {
                this.setState({
                    contacts: res.data
                });
                console.log(this.state.contacts);
            })
            .catch(err => {
                console.log(err + 'Error from Contact List');
            })
    };

    render() {
        return (
            <div className="container">
                <Card sx={{ minWidth: 300 }}>
                    <CardContent>
                        <div className="row-justify-content-center">
                            <div classNam="col d-flex">
                                <div className="col">
                                    <Link to="/create" className="btn btn-sm btn-sucess"  style={{ fontSize:13}}>< BsFillPersonPlusFill fontSize={23} style={{ color: 'green' }} /> &nbsp;Create New Contact</Link>
                                    <p className="text-center lead">Contact List</p>
                                </div>
                            </div>
                            <div className="col">
                                <div style={{ height: 390, width: '100%' }}>
                                    <DataGrid
                                        rows={this.state.contacts}
                                        columns={this.header}
                                        getRowId={(row) => row._id}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default ShowContacts;