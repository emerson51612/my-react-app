import React, { useState, useEffect } from "react";
import _axios, { BASE_URL } from "../../utility/Axios";
import { toast } from 'react-toastify';
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Edit_Lib({ setTitle }) {
  useEffect(() => {
    setTitle("Edit Library");
  }, []);

  const [library, setLibrary] = useState({});
  const [question_list, setQuestionList] = useState([]);

  const [name, setName] = useState("");
  const [date_of_publish, setDate_of_publish] = useState("");
  const [id, setId] = useState("");

  let history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    history("/");
  };

  const handleGetLibrary = async () => {
    // Call API to get library by id
  };

  const handleGetQuestions = async () => {
    try {
      const resp = await _axios.get(`${BASE_URL}/api/v1/question?library_id=${id}`, {
        withCredentials: true,
      });
    } catch (error){
      toast.error(error.response.data.error);
    }
  }
  return (
    <div style={{ height: "85vh", paddingTop: "1rem" }}>
      <Form
        style={{ marginLeft: "15rem", marginRight: "15rem" }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "white" }}>Library name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter library name"
            defaultValue={name}
            required
            name="library_name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "white" }}>
            Library Description (Optional)
          </Form.Label>
          <Form.Control as="textarea" rows={3} name="description" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Button type="submit">Update Library</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Edit_Lib;
