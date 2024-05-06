import react, {useState, useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Races_Lib from './Races_Lib'; 
import {v4 as uuid} from "uuid";
import {Link, useNavigate} from "react-router-dom";


function Edit_Lib(){
    const [name, setName] = useState("");
    const [date_of_publish, setDate_of_publish] = useState("");
    const [id, setId] = useState("");

    let history = useNavigate();

    var index = Races_Lib.map(function(e){
        return e.id;
        }).indexOf(id);


    const handleSubmit =(e) => {
            e.preventDefault();
            
            let a = Races_Lib[index];
            a.name = name;
            a.date_of_publish = date_of_publish;

    
            history("/")
        }

        useEffect(() => {
            setName(localStorage.getItem("name"));
            setDate_of_publish(localStorage.getItem("date_of_publish"));
            setId(localStorage.getItem("id"));
        },[])

    return(
        <div>
        <Form className="d_grid_gap_2" style={{margin: "15rem"}}>
            <Form.Group className="mb_3" controlId="formName">
                <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb_3" controlId="formDate_of_publish">
                <Form.Control type="text" placeholder="Enter Date of Publish" required value={date_of_publish} onChange={(e) => setDate_of_publish(e.target.value)}>
                </Form.Control>
                <Button onClick={(e)=> handleSubmit(e)} type="submit">Update</Button>
            </Form.Group>
        </Form>    
        </div>
    )

}

export default Edit_Lib;