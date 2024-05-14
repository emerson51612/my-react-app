import React, { useState, useEffect } from "react";
import _axios, { BASE_URL } from "../../utility/Axios";
import { toast } from "react-toastify";
import { Button, Form, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Edit_Lib({ setTitle }) {
  useEffect(() => {
    setTitle("Edit Library");
    handleGetLibrary();
    handleGetQuestions();
  }, []);
  const { id } = useParams();
  const [libraryName, setLibraryName] = useState("");
  const [libraryDescription, setLibraryDescription] = useState("");
  const [question_list, setQuestionList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formDatas = new FormData(form);
    const formJson = Object.fromEntries(formDatas.entries());
    try {
      const resp = await _axios.put(`${BASE_URL}/api/v1/library/${id}`, formJson, {
        withCredentials: true,
      });
      if (resp.data.error_code === 0) {
        toast.success("Library updated successfully");
      }
      else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleGetLibrary = async () => {
    try {
      const resp = await _axios.get(`${BASE_URL}/api/v1/library/${id}`, {
        withCredentials: true,
      });
      const data = resp.data.data;
      setLibraryName(data.library_name);
      setLibraryDescription(data.description);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleGetQuestions = async () => {
    try {
      const resp = await _axios.get(
        `${BASE_URL}/api/v1/question/list?library_id=${id}`,
        {
          withCredentials: true,
        }
      );
      setQuestionList(resp.data.data.items);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleCreate = () => {
    toast.success("create")
  };

  const handleEdit = (id) => {
    toast.success("edit");
  };

  const handleCopy = async (id) => {
    try {
      await _axios.post(`${BASE_URL}/api/v1/question/copy?question_id=${id}`, {
        withCredentials: true,
      });
      await handleGetQuestions();
      toast.success("Question copied successfully");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await _axios.delete(`${BASE_URL}/api/v1/question/${id}`, {
        withCredentials: true,
      });
      await handleGetQuestions();
      toast.success("Question deleted successfully");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <div style={{ paddingTop: "1rem" }}>
      <Form
        style={{ marginLeft: "15rem", marginRight: "15rem" }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "white" }}>Library name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter library name"
            defaultValue={libraryName}
            required
            name="library_name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "white" }}>
            Library Description (Optional)
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            defaultValue={libraryDescription}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Button type="submit">Update Library</Button>
        </Form.Group>
      </Form>
      <div>
        <div className="add_div" style={{marginRight: "10%", marginLeft:"10%", display: "flex", justifyContent: "space-between"}}>
          <div className="title" style={{color: "white"}}>Question List</div>
          <button className="create-button" onClick={handleCreate}>
            Create Question
          </button>
        </div>
        <section style={{width: "80%", marginLeft: "10%"}}>
          <Table striped bordered hover size="sm">
            <tr>
              <th className="th_1">Question</th>
              <th className="th_1">Created on</th>
              <th className="th_1">Manage</th>
            </tr>

            {question_list && question_list.length > 0 ? (
              question_list.map((item) => (
                <tr key={item.id}>
                  <td className="th_1">{item.question}</td>
                  <td className="th_1">{item.created_at.slice(0, 10)}</td>
                  <td className="th_1">
                    <Button
                      className="button_edit1"
                      style={{ color: "green" }}
                      onClick={() => handleEdit(item._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="button_copy1"
                      style={{ color: "blue" }}
                      onClick={() => handleCopy(item._id)}
                    >
                      Copy
                    </Button>
                    <Button
                      className="button_delete1"
                      style={{ color: "red" }}
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No data available</td>
              </tr>
            )}
          </Table>
          <div></div>
        </section>
      </div>
    </div>
  );
}

export default Edit_Lib;
