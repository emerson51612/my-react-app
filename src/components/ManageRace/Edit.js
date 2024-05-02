import react, {useState, useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Races from './Races'; 
import {v4 as uuid} from "uuid";
import {Link, useNavigate} from "react-router-dom";

function Edit(){
    const [subject, setSubject] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [id, setId] = useState("");

    let history = useNavigate();

    var index = Races.map(function(e){
        return e.id;
        }).indexOf(id);


    const handleSubmit =(e) => {
            e.preventDefault();
            
            let a = Races[index];
            a.subject = subject;
            a.difficulty = difficulty;

    
            history("/")
        }

        useEffect(() => {
            setSubject(localStorage.getItem("subject"));
            setDifficulty(localStorage.getItem("difficulty"));
            setId(localStorage.getItem("id"));
        },[])

    return(
        <div>
        <Form className="d_grid_gap_2" style={{margin: "15rem"}}>
            <Form.Group className="mb_3" controlId="formSubject">
                <Form.Control type="text" placeholder="Enter Subject" required value={subject} onChange={(e) => setSubject(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb_3" controlId="formDifficulty">
                <Form.Control type="text" placeholder="Enter Difficulty" required value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                </Form.Control>
                <Button onClick={(e)=> handleSubmit(e)} type="submit">Update</Button>
            </Form.Group>
        </Form>    
        </div>
    )

}

export default Edit;