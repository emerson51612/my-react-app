import react, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Races from './Races'; 
import {v4 as uuid} from "uuid";
import {Link, useNavigate} from "react-router-dom";

function Add() {

    const [subject, setSubject] = useState("");
    const [difficulty, setDifficulty] = useState("");

    let history = useNavigate();

    const handleSubmit =(e) => {
        e.preventDefault();
        const ids = uuid();
        let UniqueId = ids.slice(0, 8);

        let a = subject,
        b = difficulty;

        Races.push({id: UniqueId, subject: a, difficulty: b});

        history("/")
    }

    return <div>
        <Form className="d_grid_gap_2" style={{margin: "15rem"}}>
            <Form.Group className="mb_3" controlId="formSubject">
                <Form.Control type="text" placeholder="Enter Subject" required onChange={(e) => setSubject(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb_3" controlId="formDifficulty">
                <Form.Control type="text" placeholder="Enter Difficulty" required onChange={(e) => setDifficulty(e.target.value)}>
                </Form.Control>
                <Button onClick={(e)=> handleSubmit(e)} type="submit">Submit</Button>
            </Form.Group>
        </Form>
            </div>;
}

export default Add;