import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../App.css';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import DatePicker from "react-date-picker";
import imageUrl from '../images/travelimg1.jpg'
import moment from "moment-timezone";
const axios = require('axios');
const divStyle = {
    width: '100%',
    height: '100%' ,
    //backgroundImage: `url(${imageUrl})`,
    //backgroundRepeat:  'cover',
    backgroundColor: 'white',
};




moment.tz.setDefault("America/Los_Angeles");
class TravelDetail extends Component {

            Trip={
                travellerId:'',
                travelerName:'',
                travelStartDate:'',
                tripId:'',
                source:'',
                destination:'',
                travelMonth:'',
                mode:'',
                airways:'',
                travellingWith:'',
                isTicketBooked:false,
                isDomestic:false,
                canTakePackageInd:false,
                isFinalDestination:false,
            //    ReturnDate:'',
              //  Itinerary:'',
              //  OperatedBy:'',
               // ServiceObtained:'',
                previouslyTravel:false,
            };

    constructor(props) {
        super(props);
        this.state = {
            trip: this.Trip,
           // errors: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
       this.handleInputChange=this.handleInputChange.bind(this);
    }


    handleChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.trip};
         item[name] = value;
        this.setState({trip:item});
    }



  /*  componentDidMount() {
        this.setState({isLoading: true});
    }*/

    async handleSubmit(event) {
        event.preventDefault();
        const {trip} = this.state;
        this.setState({trips:{trip}});
        /*const options = {
            headers: {'content-Type': 'application/json'}
        };*/
           // alert(JSON.stringify(this.state));
        axios.post(`${process.env.REACT_APP_BACKEND_HOST_GCP}/createTrip`,JSON.stringify(this.state),{
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            ).then((response) => {
                alert(JSON.stringify(response.data.respMessage));
                console.log(response);
        }).catch((error) => {
            console.log(JSON.stringify(error));
            console.log(error);
            alert(JSON.stringify(error.message));
        });
    };


    handleStartDateChange = date => {
        let datestate=this.state.trip;
        datestate.travelStartDate=date;
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var fomratDate=month+'/'+day+'/'+year;

        this.setState({
            travelStartDate:fomratDate,
        });
    };



    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let item = {...this.state.trip};
        item[name] = value;

        this.setState({trip:item});
    }



    handleDateChange = date => {
        let datestate=this.state.trip;

        datestate.ReturnDate=date;
        this.setState({
            ReturnDate:date,
        });
    };




    render(){
        const title=<h1>{"Traveler Information"}</h1>;
        const {trip}=this.state;

     /*   if (!isLoading) { //need to change based on requirement
            return <p>Loading...</p>;
        }*/

        return <div>
            <Container className="divStyle">
                <div className="containerStyle">
                 <Form onSubmit={this.handleSubmit}>
                   <span className="title" > {title}</span>
            <div className="formGroups">
                   <FormGroup>
                         <strong for="TravelerName">TravelerName</strong><br/>
                          <Input type="text" name="travelerName" id="travelerName" value={trip.travelerName || ''}
                            onChange={this.handleChange} autoComplete="travelerName" maxLength={30} placeholder="Traveler Name"/>
                          </FormGroup>

                          <br/>


                <FormGroup>
                    <strong for="Email">Email</strong><br/>
                    <Input type="email" name="travellerId" id="travellerId" value={trip.travellerId || ''}
                           onChange={this.handleChange} autoComplete="Email" placeholder="Email ID"/>
                </FormGroup>
                <br/>


                   <FormGroup >
                    <strong for="StartDate">StartDate</strong><br/>
                    {/*<DatePicker  name="travelStartDate" id="travelStartDate" value={trip.travelStartDate || ''}
                           onChange={this.handleStartDateChange} autoComplete="Date" minDate={moment().toDate()}/>*/}
                           <Input type="date" name="travelStartDate" id="travelStartDate" value={trip.travelStartDate || ''}
                                  onChange={this.handleStartDateChange} autoComplete="Date" />
                    </FormGroup>
<br/>


                    <FormGroup>
                    <strong for="Source">Source</strong><br/>
                    <Input type="text" name="source" id="source" value={trip.source || ''}
                           onChange={this.handleChange} autoComplete="Source" maxLength={3} placeholder="Source Location"/>
                    </FormGroup>
<br/>
                    <FormGroup>
                    <strong for="Destination">Destination</strong><br/>
                    <Input type="text" name="destination" id="destination" value={trip.destination || ''}
                           onChange={this.handleChange} autoComplete="Destination" placeholder="Destination Location" maxLength={3}/>
                    </FormGroup>
<br/>
                 {/*   <FormGroup>
                    <Label for="Itinerary">Itinerary</Label>
                    <Input type="text" name="Itinerary" id="Itinerary" value={trip.Itinerary || ''}
                           onChange={this.handleChange} autoComplete="Itinerary"/>
                    </FormGroup>*/}

                    <FormGroup>
                    <strong for="OperatedBy">OperatedBy</strong><br/>
                    <Input type="text" name="airways" id="airways" value={trip.airways || ''}
                           onChange={this.handleChange} autoComplete="airways" placeholder="Name of the Airline" maxLength={30}/>
                    </FormGroup>
<br/>
                    {/*<FormGroup>*/}
                    {/*<Label for="ServiceObtained">ServiceObtained</Label>*/}
                    {/*<Input type="text" name="ServiceObtained" id="ServiceObtained" value={trip.ServiceObtained || ''}*/}
                           {/*onChange={this.handleChange} autoComplete="ServiceObtained"/>*/}
                    {/*</FormGroup>*/}


                    <FormGroup>
                                        <strong for="mode">Mode</strong><br/>
                                        <Input type="text" name="mode" id="mode" value={trip.mode || ''}
                                               onChange={this.handleChange} autoComplete="mode" placeholder="Mode of Travel"/>
                                        </FormGroup>
                    <br/>
                                        <FormGroup>
                                        <strong for="travellingWith">TravellingWith</strong><br/>
                                        <Input type="text" name="travellingWith" id="travellingWith" value={trip.travellingWith || ''}
                                               onChange={this.handleChange} autoComplete="travellingWith" maxLength={30} placeholder="Co-Traveller Name"/>
                                        </FormGroup>
                    <br/>
<div className="checkGroups">
                    <FormGroup id="ptc">
                    <label for="PreviouslyTravel">PreviouslyTravel</label>{'  '}
                    <input type="checkbox"  className="text-center" name="previouslyTravel" id="previouslyTravel" checked={this.state.trip.previouslyTravel}
                           onChange={this.handleInputChange} autoComplete="PreviouslyTravel" />
                    </FormGroup>

                    <FormGroup id="itb">
                    <label for="isTicketBooked">TicketBooked</label> {'  '}
                    <input type="checkbox" name="isTicketBooked" id="isTicketBooked" checked={this.state.trip.isTicketBooked}
                           onChange={this.handleInputChange} autoComplete="isTicketBooked"  />
                    </FormGroup>

                    <FormGroup id="idc">
                    <label for="isDomestic">IsDomestic</label> {' '}
                    <input type="checkbox" name="isDomestic" id="isDomestic" checked={this.state.trip.isDomestic}
                           onChange={this.handleInputChange} autoComplete="isDomestic"  />
                    </FormGroup>

                    <FormGroup id="ctp">
                    <label for="canTakePackageInd">CanTakePackage</label> {'  '}
                    <input type="checkbox" name="canTakePackageInd" id="canTakePackageInd" checked={this.state.trip.canTakePackageInd}
                           onChange={this.handleInputChange} autoComplete="canTakePackageInd" />
                    </FormGroup>

                    <FormGroup id="fdc">
                    <label for="isFinalDestination">FinalDestination</label> {'  '}
                    <input type="checkbox" name="isFinalDestination" id="isFinalDestination" checked={this.state.trip.isFinalDestination}
                           onChange={this.handleInputChange} autoComplete="isFinalDestination" />
                    </FormGroup>

</div>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{'   '}
                        <Button color="secondary" tag={Link} to="/view">view</Button>
                    </FormGroup>
                    </div>
                </Form>

</div>

            </Container>



        </div>



    }
}

export default withRouter(TravelDetail);
