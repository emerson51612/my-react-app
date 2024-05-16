import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import _axios, { BASE_URL } from "../../utility/Axios";
import { toast } from "react-toastify";

export default function EditQuestionModal(props) {
  useEffect(() => {
    getQuestionDetails();
  }, [props.question_id]);
	useEffect(() => {
		reset();
	}, [props.show]);
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
	const reset = () => {
		setQuestion("");
		setChoices([]);
		setCorrectAnswer("");
	}
  const getQuestionDetails = async () => {
    // API call to get question details
    if (!props.question_id) {
      return;
    }
    try {
      const resp = await _axios.get(
        `${BASE_URL}/api/v1/question/${props.question_id}`,
        {
          withCredentials: true,
        }
      );
      let questionData = resp.data.data;
      setQuestion(questionData.question);
      let parsed_choice = [];
      for (let i = 0; i < questionData.choices.length; i++) {
				if (questionData.answer === questionData.choices[i].choice) {
					setCorrectAnswer(i);
				}
        parsed_choice.push(questionData.choices[i].choice);
      }
      setChoices(parsed_choice);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formDatas = new FormData(form);
    const formJson = Object.fromEntries(formDatas.entries());
    let postData = {
      question: formJson.question,
      choices: [],
      answer: "",
      question_type: "MULTIPLECHOICE",
    };
    const choice_list = Array.from(formDatas.values()).slice(1);
    if (choice_list.length < 2) {
      toast.error("Minimum 2 choices");
      return;
    }
    if (choice_list.length > 8) {
      toast.error("Maximum 8 choices");
      return;
    }
    postData.answer = choice_list[correctAnswer];
    for (const choice of choice_list) {
      postData.choices.push({ choice: choice, feedback: "" });
    }
    try {
      const resp = await _axios.put(
        `${BASE_URL}/api/v1/question/${props.question_id}`,
        postData,
        {
          withCredentials: true,
        }
      );
      if (resp.data.error_code === 0) {
        toast.success("Question updated successfully");
        props.onEdit();
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleAddChoice = () => {
    setChoices([...choices, ""]);
  };
  const handleMarkCorrect = (index) => {
    setCorrectAnswer(index);
  };
  const handleRemoveChoice = (index) => {
    setChoices(choices.filter((_, i) => i !== index));
    setCorrectAnswer(0);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit question
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formQuestionText">
            <h5>Question</h5>
            <Form.Control
              as="textarea"
              rows={2}
              defaultValue={question}
              placeholder="Enter question"
              required
              name="question"
            />
          </Form.Group>
          <h5>
            Choice{" "}
            <Button
              style={{ marginLeft: "10px" }}
              variant="outline-primary"
              size="sm"
              onClick={handleAddChoice}
            >
              Add choice
            </Button>
          </h5>
          {choices && choices.length > 0 ? (
            choices.map((choice, index) => (
              <Form.Group className="mb-3">
                <div style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder="Enter choice"
                    defaultValue={choice}
                    required
                    name={index}
                    style={{ marginRight: "10px" }}
                  />
                  <Button
                    variant="outline-primary"
                    size="sm"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleMarkCorrect(index)}
                  >
                    Mark as correct
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleRemoveChoice(index)}
                  >
                    Delete
                  </Button>
                  {correctAnswer === index && (
                    <div style={{ color: "green" }}>
                      Marked as correct answer!!
                    </div>
                  )}
                </div>
              </Form.Group>
            ))
          ) : (
            <div />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
