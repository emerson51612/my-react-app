import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Result = ({ ranking, playerData }) => {
  return (
    <div className="result-container">
      <div className="result-title">SCOREBOARD</div>
      <div className="result-list">
        <Container
          style={{ color: "white", padding: "20px", fontSize: "25px" }}
        >
          <Row className="mb-3">
            <Col>Rank</Col>
            <Col>Player name</Col>
            <Col>Point earned</Col>
            <Col>Time score</Col>
          </Row>
          {ranking && ranking.length > 0 ? (
            ranking.map((item, index) => (
              <Row key={item} className="mb-3">
                <Col>{index + 1}</Col>
                <Col>{playerData[item].name}</Col>
                <Col>{playerData[item].point}</Col>
                <Col>{playerData[item].time}</Col>
              </Row>
            ))
          ) : (
            <div>There is no one here</div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Result;
