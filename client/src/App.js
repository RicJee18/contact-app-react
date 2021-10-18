import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateContact from './components/create-contact';
import DeleteContact from './components/delete-contact';
import ContactDetails from "./components/contact-details";
import EditContact from "./components/edit-contact";
import ShowContacts from "./components/contact-list";
import DenseAppBar from "./components/navbar/navbar";
import Container from '@mui/material/Container';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <DenseAppBar />
        <Container maxWidth="md">
          <br /> <br />
          <Route path="/" exact component={ShowContacts} />
          <Route path="/contact/:id" component={ContactDetails} />
          <Route path="/create" component={CreateContact} />
          <Route path="/update/:id" component={EditContact} />
          <Route path="/delete/:id" component={DeleteContact} />
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;

