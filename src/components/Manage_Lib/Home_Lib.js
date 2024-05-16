import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import _axios, { BASE_URL } from "../../utility/Axios";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Manage_Lib.css";

function Home_Lib({ setTitle }) {
  let history = useNavigate();
  useEffect(() => {
    setTitle("Library Management");
    getListData();
  }, []);

  const [libraryList, setLibraryList] = useState([]);
  const getListData = async () => {
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

  const handleCreate = () => {
    history("/management/library/add");
  };

  const handleEdit = (id) => {
    history(`/management/library/edit/${id}`);
  };

  const handleCopy = async (id) => {
    try {
      await _axios.post(`${BASE_URL}/api/v1/library/copy?library_id=${id}`, {
        withCredentials: true,
      });
      await getListData();
      toast.success("Library copied successfully");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await _axios.delete(`${BASE_URL}/api/v1/library/${id}`, {
        withCredentials: true,
      });
      await getListData();
      toast.success("Library deleted successfully");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      <div className="add_div">
        <button className="create-button" onClick={handleCreate}>Create Library</button>
      </div>
      <section>
        <Table striped bordered hover size="sm">
          <tr>
            <th className="th_1">Name</th>
            <th className="th_1">Description</th>
            <th className="th_1">Created on</th>
            <th className="th_1">Manage</th>
          </tr>

          {libraryList && libraryList.length > 0 ? (
            libraryList.map((item) => (
              <tr key={item.id}>
                <td className="th_1">{item.library_name}</td>
                <td className="th_1">{item.description}</td>
                <td className="th_1">{item.created_at.slice(0,10)}</td>
                <td className="th_1">
                  <Button
                    className="button_edit1"
                    style={{color: "green"}}
                    onClick={() => handleEdit(item._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="button_copy1"
                    style={{color: "blue"}}
                    onClick={() => handleCopy(item._id)}
                  >
                    Copy
                  </Button>
                  <Button
                    className="button_delete1"
                    style={{color: "red"}}
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
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

export default Home_Lib;
