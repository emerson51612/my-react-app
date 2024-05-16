import React, { useEffect } from "react";
import { toast } from 'react-toastify';
import _axios, { BASE_URL } from "../../utility/Axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Add_Lib({ setTitle }) {
  useEffect(() => {
    setTitle("Create Library");
  }, []);

  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formDatas = new FormData(form);
    const formJson = Object.fromEntries(formDatas.entries());
    try {
      const resp = await _axios.post(`${BASE_URL}/api/v1/library/create`, formJson, {
        withCredentials: true,
      });
      if (resp.data.error_code === 0) {
        toast.success("Library added successfully");
        history("/management/library");
      }
      else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div style={{ height: "85vh", paddingTop: "5rem" }}>
      <Form style={{ marginLeft: "15rem", marginRight: "15rem" }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "white" }}>Library name</Form.Label>
          <Form.Control type="text" placeholder="Enter library name" required name="library_name"/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "white" }}>
            Library Description (Optional)
          </Form.Label>
          <Form.Control as="textarea" rows={3} name="description"/>
        </Form.Group>
        <Form.Group>
          <Button type="submit">
            Create Library
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Add_Lib;
