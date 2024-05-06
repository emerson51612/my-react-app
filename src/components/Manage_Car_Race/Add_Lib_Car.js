import react, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Races_Lib_Car from './Races_Lib_Car'; 
import {v4 as uuid} from "uuid";
import {Link, useNavigate} from "react-router-dom";

function Add_Lib_Car() {

    const [name, setName] = useState("");
    const [date_of_publish, setDate_of_publish] = useState("");

    let history = useNavigate();

    const handleSubmit =(e) => {
        e.preventDefault();
        const ids = uuid();
        let UniqueId = ids.slice(0, 8);

        let a = name,
        b = date_of_publish;

        Races_Lib_Car.push({id: UniqueId, name: a, date_of_publish: b});

        history("/")
    }

    return <div>
        <Form className="d_grid_gap_2" style={{margin: "15rem"}}>
            <Form.Group className="mb_3" controlId="formName">
                <Form.Control type="text" placeholder="Enter Name" required onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb_3" controlId="formDate_of_publish">
                <Form.Control type="text" placeholder="Enter Date of Publish" required onChange={(e) => setDate_of_publish(e.target.value)}>
                </Form.Control>
                <Button onClick={(e)=> handleSubmit(e)} type="submit">Submit</Button>
            </Form.Group>
        </Form>
            </div>;
}

export default Add_Lib_Car;