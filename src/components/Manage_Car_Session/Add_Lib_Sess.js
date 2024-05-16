import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _axios, { BASE_URL } from "../../utility/Axios";
import { Button, Form } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import { useNavigate } from "react-router-dom";

function Add_Lib_Sess({ setTitle }) {
  useEffect(() => {
    setTitle("Create Session");
    getRaceList();
  }, []);

  let history = useNavigate();
  const [race, setRace] = useState("");

  const [raceList, setRaceList] = useState([]);
  const getRaceList = async () => {
    try {
      const response = await _axios.get(
        `${BASE_URL}/api/v1/car_race/list?page=1&limit=100`,
        {
          withCredentials: true,
        }
      );
      setRaceList(response.data.data.items);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!race) {
      toast.error("No race has been selected");
      return;
    }
    const form = e.target;
    const formDatas = new FormData(form);
    const formJson = Object.fromEntries(formDatas.entries());
    formJson.car_race_id = race;
    try {
      const resp = await _axios.post(
        `${BASE_URL}/api/v1/session_management/create`,
        formJson,
        {
          withCredentials: true,
        }
      );
      if (resp.data.error_code === 0) {
        toast.success("Session created successfully");
        history("/management/session");
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div style={{ height: "85vh", paddingTop: "5rem" }}>
      <Form
        style={{ marginLeft: "15rem", marginRight: "15rem" }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "white" }}>Session name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter session name"
            required
            name="car_race_session_name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "white" }}>Select car race to link</Form.Label>
          <Form.Select
            aria-label="Default select example"
            required
            value={race}
            onChange={(e) => setRace(e.target.value)}
          >
            <option>Select a race as base</option>
            {raceList && raceList.length > 0 ? (
              raceList.map((item) => (
                <option value={item._id}>{item.car_race_name}</option>
              ))
            ) : (
              <option>No race available, please create a race</option>
            )}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Button type="submit">Create Session</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Add_Lib_Sess;
