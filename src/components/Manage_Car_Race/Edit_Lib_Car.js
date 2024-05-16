import React, { useState, useEffect } from "react";
import _axios, { BASE_URL } from "../../utility/Axios";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import { useParams, useNavigate } from "react-router-dom";

function Edit_Lib_Car({ setTitle }) {
  useEffect(() => {
    setTitle("Edit Race");
    handleGetRace();
    getLibraryList();
  }, []);
  let history = useNavigate();
  const { id } = useParams();
  const [carRaceName, setCarRaceName] = useState("");
  const [carRaceDescription, setCarRaceDescription] = useState("");
  const [bonus, setBonus] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [library, setLibrary] = useState("");

  const [libraryList, setLibraryList] = useState([]);
  const getLibraryList = async () => {
    try {
      const response = await _axios.get(
        `${BASE_URL}/api/v1/library/list?page=1&limit=100`,
        {
          withCredentials: true,
        }
      );
      setLibraryList(response.data.data.items);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!library) {
      toast.error("No library has been selected");
      return;
    }
    const form = e.target;
    const formDatas = new FormData(form);
    const formJson = Object.fromEntries(formDatas.entries());
    formJson.bonus_time_setting = bonus;
    formJson.penalty_time_setting = penalty;
    formJson.library_id = library;
    try {
      const resp = await _axios.put(
        `${BASE_URL}/api/v1/car_race/${id}`,
        formJson,
        {
          withCredentials: true,
        }
      );
      if (resp.data.error_code === 0) {
        toast.success("Race updated successfully");
        history("/management/race");
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleGetRace = async () => {
    try {
      const resp = await _axios.get(`${BASE_URL}/api/v1/car_race/${id}`, {
        withCredentials: true,
      });
      const data = resp.data.data;
      setCarRaceName(data.car_race_name);
      setCarRaceDescription(data.description);
      setBonus(data.bonus_time_setting);
      setPenalty(data.penalty_time_setting);
      setLibrary(data.library_id);
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
          <Form.Label style={{ color: "white" }}>Car race name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter race name"
            defaultValue={carRaceName}
            required
            name="car_race_name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "white" }}>
            Race Description (Optional)
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            defaultValue={carRaceDescription}
          />
        </Form.Group>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Group className="mb-3" style={{ width: "40vw" }}>
            <Form.Label style={{ color: "white" }}>Linked Library</Form.Label>
            <Form.Select
              aria-label="Default select example"
              required
              value={library}
              onChange={(e) => setLibrary(e.target.value)}
            >
              <option>Select a library</option>
              {libraryList && libraryList.length > 0 ? (
                libraryList.map((item) => (
                  <option value={item._id}>{item.library_name}</option>
                ))
              ) : (
                <option>No library available, please create a library</option>
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" style={{ width: "20vw" }}>
            <Form.Label style={{ color: "white" }}>
              Bonus time setting (second)
            </Form.Label>
            <RangeSlider
              value={bonus}
              onChange={(e) => setBonus(e.target.value)}
              min={0}
              max={10}
              step={0.1}
              tooltip="auto"
            />
            <Form.Label style={{ color: "white" }}>
              Penalty time setting (second)
            </Form.Label>
            <RangeSlider
              value={penalty}
              onChange={(e) => setPenalty(e.target.value)}
              min={0}
              max={10}
              step={0.1}
              tooltip="auto"
            />
          </Form.Group>
        </div>
        <Form.Group>
          <Button type="submit">Update Race</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Edit_Lib_Car;
