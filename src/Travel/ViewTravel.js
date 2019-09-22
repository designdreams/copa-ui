import {Button, Container, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";
import React from "react";
import DateTimePicker from "react-datetime-picker";
import imageUrl from '../images/travelimg1.jpg'

class viewTravel extends React.Component{


    viewDetail={
        email:'',
        Source: '',
        Destination:'',
        StartDate:new Date(),

};

    constructor(props){
        super(props);
        this.state={
            viewDetail:this.viewDetail,
            errors: {},
        }

        this.handleChange = this.handleChange.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }



    handleDateChange = date => {
      let datestate=this.state.viewDetail;
        datestate.StartDate=date;
        this.setState({
            StartDate:date,
        });
    };

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.viewDetail};
        item[name] = value;
        this.setState({viewDetail:item});
    };


    validateForm() {

        let fields = this.state.viewDetail;
        let errors = {};
        let formIsValid = true;
/*
        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "*Please enter your username.";
        }

        if (typeof fields["username"] !== "undefined") {
            if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["username"] = "*Please enter alphabet characters only.";
            }
        }*/

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter your email-ID.";
        }

        if (typeof fields["email"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"])) {
                formIsValid = false;
                errors["email"] = "*Please enter valid email-ID.";
            }
        }
/*
        if (!fields["mobileno"]) {
            formIsValid = false;
            errors["mobileno"] = "*Please enter your mobile no.";
        }

        if (typeof fields["mobileno"] !== "undefined") {
            if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["mobileno"] = "*Please enter valid mobile no.";
            }
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["password"] = "*Please enter secure and strong password.";
            }
        }*/

        this.setState({
            errors: errors
        });
        return formIsValid;


    }




    async fetchUser(event) {
        event.preventDefault();
        const {viewDetail} = this.state;
        alert(JSON.stringify(viewDetail));
        if (this.validateForm()) {
            await fetch(`http://localhost:8081/tc/findTrip`, {
                method: (viewDetail.id) ? 'PUT' : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(viewDetail),
            }).then((response) => {
                console.log("response", response);
                this.setState({
                    fetchUser: response.data
                });
                console.log("fetchUser", this.state.fetchUser);
            })
                .catch((error) => {
                    console.log(error);
                });

            this.props.history.push('/home');
        }
    };

    render(){
        const {viewDetail} = this.state;
        const ViewDetails=<h1>View Details</h1>
        return<div style={{backgroundImage: `url(${imageUrl})` }}>
            <Container style={{fontWeight: 'bold'}}>
                {ViewDetails}
                     <FormGroup>
                        <Label for="Email">Email</Label>
                        <Input type="email" name="email" id="email" value={viewDetail.email || ''}
                               onChange={this.handleChange} autoComplete="email" />
                         <div className="alert-danger">{this.state.errors.email}</div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Source">Source</Label>
                        <Input type="text" name="Source" id="Source" value={viewDetail.Source || ''}
                               onChange={this.handleChange} autoComplete="Source" maxLength={3}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Destination">Destination</Label>
                        <Input type="text" name="Destination" id="Destination" value={viewDetail.Destination || ''}
                               onChange={this.handleChange} autoComplete="Destination" maxLength={3}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="StartDate">StartDate</Label>
                        <DateTimePicker name="StartDate" id="StartDate"   selected={this.state.StartDate} value={this.state.viewDetail.StartDate || ''}
                               onChange={this.handleDateChange} autoComplete="StartDate"/>
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" tag={Link} to="/view" id="view" onClick={this.fetchUser}>View</Button>{' '}
                    </FormGroup>

            </Container>

        </div>
    }

}

export default viewTravel
