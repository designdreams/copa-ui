import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import DateTimePicker from "react-datetime-picker";
import imageUrl from '../images/travelimg1.jpg'



class TravelDetail extends Component {

            Trip={
                travellerId:'',
                travelerName:'',
                travelStartDate:'',
                tripId:'',
                Source:'',
                Destination:'',
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
                PreviouslyTravel:false,
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
        this.setState({trips:{trip}})

            await fetch(`http://localhost:8081/tc/createTrip`, {
            method: (trip.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.trips),
        });
      // this.props.history.push('http://localhost:8081/tc');
    };


    handleStartDateChange = date => {
        let datestate=this.state.trip;
        datestate.travelStartDate=date;

        this.setState({
            travelStartDate:date,
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
        const title=<h1 >{"Traveler Detail"}</h1>;
        const {trip}=this.state;


     /*   if (!isLoading) { //need to change based on requirement
            return <p>Loading...</p>;
        }*/

        return<div style={{backgroundImage: `url(${imageUrl})` }}>
            <Container style={{fontWeight: 'bold'}} >
                 <Form onSubmit={this.handleSubmit}>
                    {title}
                <FormGroup >
                    <Label for="Email">Email</Label>
                    <Input type="email" name="travellerId" id="travellerId" value={trip.travellerId || ''}
                           onChange={this.handleChange} autoComplete="Email"/>
                </FormGroup>

                 <FormGroup>
                    <Label for="TravelerName">TravelerName</Label>
                    <Input type="text" name="travelerName" id="travelerName" value={trip.travelerName || ''}
                           onChange={this.handleChange} autoComplete="travelerName" maxLength={30}/>
                 </FormGroup>

                   <FormGroup>
                    <Label for="StartDate">StartDate</Label>
                    <DateTimePicker name="travelStartDate" id="travelStartDate" value={trip.travelStartDate || ''}
                           onChange={this.handleStartDateChange} autoComplete="Date"/>
                    </FormGroup>

                  {/*  <FormGroup>
                    <Label for="ReturnDate">ReturnDate</Label>
                    <DateTimePicker name="ReturnDate" id="ReturnDate" value={trip.ReturnDate || ''}
                           onChange={this.handleDateChange} autoComplete="ReturnDate"/>
                    </FormGroup>*/}

                    <FormGroup>
                    <Label for="Source">Source</Label>
                    <Input type="text" name="Source" id="Source" value={trip.Source || ''}
                           onChange={this.handleChange} autoComplete="Source" maxLength={3}/>
                    </FormGroup>

                    <FormGroup>
                    <Label for="Destination">Destination</Label>
                    <Input type="text" name="Destination" id="Destination" value={trip.Destination || ''}
                           onChange={this.handleChange} autoComplete="Destination" maxLength={3}/>
                    </FormGroup>

                 {/*   <FormGroup>
                    <Label for="Itinerary">Itinerary</Label>
                    <Input type="text" name="Itinerary" id="Itinerary" value={trip.Itinerary || ''}
                           onChange={this.handleChange} autoComplete="Itinerary"/>
                    </FormGroup>*/}

                    <FormGroup>
                    <Label for="OperatedBy">OperatedBy</Label>
                    <Input type="text" name="airways" id="airways" value={trip.airways || ''}
                           onChange={this.handleChange} autoComplete="airways" maxLength={30}/>
                    </FormGroup>

                    {/*<FormGroup>*/}
                    {/*<Label for="ServiceObtained">ServiceObtained</Label>*/}
                    {/*<Input type="text" name="ServiceObtained" id="ServiceObtained" value={trip.ServiceObtained || ''}*/}
                           {/*onChange={this.handleChange} autoComplete="ServiceObtained"/>*/}
                    {/*</FormGroup>*/}

                    <FormGroup>
                    <Label for="PreviouslyTravel">PreviouslyTravel</Label>{'  '}
                    <input type="checkbox"  className="text-center" name="PreviouslyTravel" id="PreviouslyTravel" checked={this.state.trip.PreviouslyTravel}
                           onChange={this.handleInputChange} autoComplete="PreviouslyTravel" />
                    </FormGroup>

                    <FormGroup>
                    <Label for="isTicketBooked">TicketBooked</Label> {'  '}
                    <input type="checkbox" name="isTicketBooked" id="isTicketBooked" checked={this.state.trip.isTicketBooked}
                           onChange={this.handleInputChange} autoComplete="isTicketBooked"  />
                    </FormGroup>

                    <FormGroup>
                    <Label for="isDomestic">IsDomestic</Label> {' '}
                    <input type="checkbox" name="isDomestic" id="isDomestic" checked={this.state.trip.isDomestic}
                           onChange={this.handleInputChange} autoComplete="isDomestic"  />
                    </FormGroup>

                    <FormGroup>
                    <Label for="canTakePackageInd">CanTakePackage</Label> {'  '}
                    <input type="checkbox" name="canTakePackageInd" id="canTakePackageInd" checked={this.state.trip.canTakePackageInd}
                           onChange={this.handleInputChange} autoComplete="canTakePackageInd" />
                    </FormGroup>

                    <FormGroup>
                    <Label for="isFinalDestination">FinalDestination</Label> {'  '}
                    <input type="checkbox" name="isFinalDestination" id="isFinalDestination" checked={this.state.trip.isFinalDestination}
                           onChange={this.handleInputChange} autoComplete="isFinalDestination" />
                    </FormGroup>

                    <FormGroup>
                    <Label for="mode">Mode</Label>
                    <Input type="text" name="mode" id="mode" value={trip.mode || ''}
                           onChange={this.handleChange} autoComplete="mode"/>
                    </FormGroup>

                    <FormGroup>
                    <Label for="travellingWith">TravellingWith</Label>
                    <Input type="text" name="travellingWith" id="travellingWith" value={trip.travellingWith || ''}
                           onChange={this.handleChange} autoComplete="travellingWith" maxLength={30}/>
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{'   '}
                        <Button color="secondary" tag={Link} to="/view">view</Button>
                    </FormGroup>
                </Form>

            </Container>

        </div>
    }
}

export default withRouter(TravelDetail);
