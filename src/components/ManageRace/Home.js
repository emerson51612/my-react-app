import React, {Fragment} from "react";
import {Button, Table,} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Races from './Races';
import {Link, useNavigate} from "react-router-dom";

function Home() {
        let history = useNavigate();

        const handleEdit = (id, subject, difficulty) => {
            localStorage.setItem("id", id);
            localStorage.setItem("subject", subject);
            localStorage.setItem("difficulty", difficulty);
            history("/create");
        }

        const handleDelete = (id) => {
            var index = Races.map(function(e){
            return e.id;
            }).indexOf(id);

            Races.splice(index, 1);
            
            history('/');
        
        }

        return (
            <Fragment>
                <div style={{margin:"10rem"}}>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>
                                    Subject
                                </th>
                                <th>
                                    Difficulty
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                    <tbody>
                        {                               
                            Races && Races.length > 0 
                            ?
                            Races.map((item)=>{
                                return(
                                    <tr >
                                        <td>
                                            {item.subject}
                                        </td>
                                        <td>
                                            {item.difficulty}
                                        </td>
                                        <td>
                                            <Link to={'/edit'}>
                                            <Button onClick={() => handleEdit(item.id, item.subject, item.difficulty)}>EDIT</Button>
                                            </Link>
                                            &nbsp;
                                            <Button onClick={() => handleDelete(item.id)}>DELETE</Button>
                                        </td>
                                    </tr>

                                )
                            })
                            :
                            "no data available"
                        }
                            

  
                    </tbody>
                    </Table>
                    <br>
                    </br>
                    <Link className="d_grid_gap_2" to ="/create">
                        <Button size="lg">Create</Button>
                    </Link>
                </div>

            </Fragment>
            
                )
                }

export default Home; 