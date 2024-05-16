import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _axios, { BASE_URL } from "../../utility/Axios";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Manage_Lib_Sess.css";

function Home_Lib_Sess({ setTitle }) {
  let history = useNavigate();
  useEffect(() => {
    setTitle("Session Management");
    getListData();
  }, []);

  const [sessionList, setSessionList] = useState([]);
  const getListData = async () => {
    try {
      const response = await _axios.get(
        `${BASE_URL}/api/v1/session_management/list?page=1&limit=100`,
        {
          withCredentials: true,
        }
      );
      setSessionList(response.data.data.items);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleCreate = () => {
    history("/management/session/add");
  };

  const handleStart = async (id) => {
    try {
      await _axios.put(`${BASE_URL}/api/v1/session/start/${id}`, {
        withCredentials: true,
      });
      await getListData();
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleEnd = async (id) => {
    try {
      await _axios.put(`${BASE_URL}/api/v1/session/end/${id}`, {
        withCredentials: true,
      });
      await getListData();
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleCopyLink = (id) => {
    const link = window.location.host + "/session/" + id;
    navigator.clipboard.writeText(link);
    toast.success("Copied link to clipboard!");
  };

  const handleViewResult = (id) => {
    history(`/management/session/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await _axios.delete(`${BASE_URL}/api/v1/session_management/${id}`, {
        withCredentials: true,
      });
      await getListData();
      toast.success("Session deleted successfully");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      <div className="add_div">
        <button className="create-button" onClick={handleCreate}>
          Create Session
        </button>
      </div>
      <section>
        <Table striped bordered hover size="sm">
          <tr>
            <th className="th_1">Name</th>
            <th className="th_1">Status</th>
            <th className="th_1">Created on</th>
            <th className="th_1">Manage</th>
          </tr>

          {sessionList && sessionList.length > 0 ? (
            sessionList.map((item) => (
              <tr key={item.id}>
                <td className="th_1">{item.car_race_session_name}</td>
                <td className="th_1">{item.session_status}</td>
                <td className="th_1">{item.created_at.slice(0, 10)}</td>
                <td className="th_1">
                  {item.session_status === "CREATED" && (
                    <Button
                      className="button_edit1"
                      style={{ color: "green" }}
                      onClick={() => handleStart(item._id)}
                    >
                      Start Race
                    </Button>
                  )}
                  {item.session_status === "STARTED" && (
                    <Button
                      className="button_edit1"
                      style={{ color: "red" }}
                      onClick={() => handleEnd(item._id)}
                    >
                      End Race
                    </Button>
                  )}
                  {item.session_status !== "ENDED" && (
                    <Button
                      className="button_edit1"
                      style={{ color: "purple" }}
                      onClick={() => handleCopyLink(item._id)}
                    >
                      Copy Link
                    </Button>
                  )}
                  <Button
                    className="button_edit1"
                    style={{ color: "blue" }}
                    onClick={() => handleViewResult(item._id)}
                  >
                    View Result
                  </Button>
                  {item.session_status !== "STARTED" && (
                    <Button
                      className="button_delete1"
                      style={{ color: "red" }}
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </Table>
        <div></div>
      </section>
    </div>
  );
}

export default Home_Lib_Sess;
