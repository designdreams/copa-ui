import {Button, Container, FormGroup, Input, Label} from "reactstrap";
import {Link,withRouter} from "react-router-dom";
import React from "react";
//import DatePicker from "react-date-picker";
import moment from 'moment-timezone';
import imageUrl from '../images/travelimg1.jpg'
const axios = require('axios');


moment.tz.setDefault("America/Los_Angeles");

const divStyle = {
    width: '100%',
    height: '1000px' ,
    backgroundImage: `url(${imageUrl})`,
    backgroundSize:  'cover',
    //backgroundColor: #999,
};

class viewTravel extends React.Component {


    viewDetail = {
        //   userId:'',
        source: '',
        destination: '',
        //   travelStartDate:'',

    };

    constructor(props) {
        super(props);
        this.state = {
            viewDetail: this.viewDetail,
            errors: {},
            isfetchUser: false,
            //  fetchUser:[],
        }

        this.handleChange = this.handleChange.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }


    handleDateChange = date => {
        let datestate = this.state.viewDetail;
        datestate.travelStartDate = date;

        this.setState({
            travelStartDate: date,
        });
    };

    handleChange(event) {
        const target = event.target;
        const value = target.value.toUpperCase();
        const name = target.name;
        let item = {...this.state.viewDetail};
        item[name] = value;
        this.setState({viewDetail: item});
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

        if (!fields["userId"]) {
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
        // const {viewDetail} = this.state;
        /* axios.interceptors.request.use(function (config) {
             // Do something before request is sent

             alert(JSON.stringify(config));
             return config;
         }, function (error) {
             // Do something with request error
             return Promise.reject(error);
         });
         axios.interceptors.response.use(function (response) {
             alert(JSON.stringify(response));
             // Do something with response data
             return response;
         }, function (error) {
             // Do something with response error
             return Promise.reject(error);
         });*/
        //if (this.validateForm()) {
      //  alert(JSON.stringify(this.state.viewDetail));
        axios.post(`${process.env.REACT_APP_BACKEND_HOST_GCP}/findTrip`, JSON.stringify(this.state.viewDetail), {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        ).then((response) => {
            console.log("response", response);
            this.setState({
                fetchUser: response,
                isfetchUser: true,
            });
            console.log("fetchUser", this.state.fetchUser);
        })
            .catch((error) => {
                alert(JSON.stringify(error))
                /*       let stub_User=[];
                       stub_User["travellerId"]="ashwin";
                       alert(JSON.stringify(this.state.isfetchUser))
                       this.setState({
                           fetchUser:stub_User,
                       });
                       this.setState({
                           fetchUser:stub_User,
                           isfetchUser:true,
                       });*/
                console.log(JSON.stringify(this.state.fetchUser));
                console.log(error);
            });
        //  this.props.history.push("/home");

    }

    //  };

    render() {
        const {viewDetail} = this.state;
        const isfetchUser = this.state.isfetchUser;

        const ViewDetails = <h1>View Details</h1>
        if (!isfetchUser) {
            return <div style={divStyle}>


                <Container style={{fontWeight: 'bold'}}>
                    {ViewDetails}
                    {/*<FormGroup>
                    <Label for="Email">Email</Label>
                    <Input type="email" name="userId" id="userId" value={viewDetail.userId || ''}
                           onChange={this.handleChange} autoComplete="email"/>
                    <div className="alert-danger">{this.state.errors.email}</div>
                </FormGroup>*/}
                    <FormGroup>
                        <Label for="Source">Source</Label>
                        <Input type="text" name="source" id="source" value={viewDetail.source || ''}
                               onChange={this.handleChange} autoComplete="Source" maxLength={3}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Destination">Destination</Label>
                        <Input type="text" name="destination" id="destination" value={viewDetail.destination || ''}
                               onChange={this.handleChange} autoComplete="Destination" maxLength={3}/>
                    </FormGroup>
                    {/*<FormGroup>
                    <Label for="StartDate">StartDate</Label>
                    <DatePicker   name="travelStartDate" id="travelStartDate"
                                    value={this.state.viewDetail.travelStartDate || ''}
                                    onChange={this.handleDateChange} autoComplete="StartDate"/>
                </FormGroup>
*/}
                    <FormGroup>
                        <Button color="primary" tag={Link} to="/view" id="view"
                                onClick={this.fetchUser}>View</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Back</Button>
                    </FormGroup>

                </Container>


            </div>
        }
        if (isfetchUser) {
            const elements = this.state.fetchUser;
           // alert(JSON.stringify(elements.data.tripList));
            const tDetails = <h1>Traveler Detail's</h1>
            return (<div style={divStyle}>
                {tDetails}
                    <ul>
                <li className='title'>
                    <span>Traveller Id</span>
                    <span>Source</span>
                    <span>Destination</span>
                    <span>TravelStartDate</span>
                </li>
                {elements.data.tripList.map((person, index) => (
                    <li key={index} className='item'>
                        <span >{person.travellerId}</span>
                        <span>{person.source}</span>
                        <span>{person.destination}</span>
                        <span>{person.travelStartDate}</span>
                    </li>

                ))}
                    </ul>


            </div>);

        }

            }

}

export default withRouter(viewTravel)
