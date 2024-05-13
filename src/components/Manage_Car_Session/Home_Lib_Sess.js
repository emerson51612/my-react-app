import React from 'react';
import { Button, Table } from 'react-bootstrap';
import Races_Lib_Sess from './Races_Lib_Sess';
import { Link, useNavigate } from 'react-router-dom';
import './Manage_Lib_Sess.css'; // Import the separate CSS file for styles

function Home_Lib_Sess() {
    let history = useNavigate();

    const handleEdit = (id, name, date_of_publish) => {
        localStorage.setItem("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("date_of_publish", date_of_publish);
        history("/edit");
    };

    const handleDelete = (id) => {
        var index = Races_Lib_Sess.map(function(e) { return e.id; }).indexOf(id);
        Races_Lib_Sess.splice(index, 1);
        history('/');
    };

    return (
        
        
        <div>
            <div className="navbar">
                <div className="menu-icon">☰</div>
                <div className="title">Manage Car Race Session</div>
                <button className="button_create1">Create</button>
            </div>
        
                <head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>           
                <link href="https://fonts.googleapis.com/css2?family=Boogaloo&display=swap" rel="stylesheet"/>
                </head>
                <body>
                <section>
                <Table striped bordered hover size="sm">
                    <tr>
                        <th className="th_1">Name</th>
                        <th className="th_1">Date of Publish</th>
                        <th className="th_1">Manage</th>
                    </tr>
                
                    {Races_Lib_Sess && Races_Lib_Sess.length > 0 ? Races_Lib_Sess.map((item) => (
                        <tr key={item.id}>
                            <td className="th_1">{item.name}</td>
                            <td className="th_1">{item.date_of_publish}</td>
                            <td className="th_1">
                                <Button className='button_edit1' onClick={() => handleEdit(item.id, item.name, item.date_of_publish)}>Edit</Button>
                                <Button className= 'button_delete1' onClick={() => handleDelete(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    )) : <tr><td colSpan="3">No data available</td></tr>}
                        </Table>
                        <div></div>
                    </section>
                </body>
            
        </div>
    );
}

export default Home_Lib_Sess;
