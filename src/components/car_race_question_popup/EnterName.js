import React from "react";
import { Button, Form } from "react-bootstrap";

const EnterName = ({ setTheme, setGuestName, onEnterName }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formDatas = new FormData(form);
    const formJson = Object.fromEntries(formDatas.entries());
    setTheme(formJson.theme)
    setGuestName(formJson.user_name);
    onEnterName(formJson.user_name);
  };
  return (
    <div className="enter-name-container">
      <div className="enter-name-form">
        <Form
          style={{ marginLeft: "15rem", marginRight: "15rem" }}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3">
            <div className="title">Enter name</div>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              required
              name="user_name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <div className="title">Choose race theme</div>
            <Form.Check
              inline
              value={"modern"}
              label="Modern theme"
              name="theme"
              type="radio"
              defaultChecked
              id={`inline-radio-1`}
            />
            <Form.Check
              inline
              value={"countryside"}
              label="Countryside theme"
              name="theme"
              type="radio"
              id={`inline-radio-2`}
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit">Join</Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default EnterName;
