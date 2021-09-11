import './App.css';
import React from "react";
import axios from "axios";
import { Form, Button, Select } from "react-bootstrap";
class App extends React.Component{
  constructor() {
    super();
    this.state = {
       distance:0,
       isAccepted:false,
       isSame:false
    };
    this.source = React.createRef();
    this.destination = React.createRef();
  }
  handleData = (e)=>{
    let obj = {
      source : this.source.current.value,
      destination:this.destination.current.value
    }
    if(this.source.current.value !== this.destination.current.value){
    axios
    .post("/distance", {
      obj: obj
    }).then((response)=>{
       this.setState({
         distance:response.data.distance,
         isSame:false,
         isAccepted:true
       })
    }).catch((err)=>{
      console.log(err);
    })
  }
  else{
    this.setState({
      isSame:true,
      isAccepted:false
    })
  }
    e.preventDefault();

  }
  render(){
    return(
     <div className = "div-react">
        <form onSubmit = {this.handleData}>
          <div className = "form">
          <div className = "source">

        <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Source</Form.Label>
    <Form.Control type="text" placeholder="Source" 
    pattern="[a-zA-Z]+"
    ref = {this.source} required/>
    <Form.Text className="text-muted">
     The Place where you start
    </Form.Text>
  </Form.Group>
  </div>
  <div className = "destination">
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Destination</Form.Label>
    <Form.Control type="text" 
    pattern="[a-zA-Z]+"
    placeholder="Destination"  ref = {this.destination} required/>
    <Form.Text className="text-muted">
      The place you wanna reach!!
    </Form.Text>
  </Form.Group>
  </div>
  </div>
  <Button variant="primary" type="submit" className = "btn btn-warning">
    Submit
  </Button>
        </form>
        {this.state.isAccepted === true ? <h4 className="acc">Distance : {this.state.distance}</h4>:""}
        {this.state.isSame === true ? <h4>Source and destination cant be same</h4>:""}
     </div>
    )
  }
}
export default App;