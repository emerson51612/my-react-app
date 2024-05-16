import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Lobby = ({ playerList, playerData, sessionName }) => {
  return (
    <div className="enter-name-container">
      <div className="player-list">
        <div className="title" style={{ color: "white" }}>
          Session {sessionName}
        </div>
        <div className="title" style={{ color: "white", fontSize: "30px" }}>
          Waiting for Players (Current: {playerList.length})
        </div>
        <Container style={{color: "white", padding: "20px", fontSize: "25px"}}>
          <Row xs={2} md={3}>
            {playerList && playerList.length > 0 ? (
              playerList.map((item) => <Col key={item}>{playerData[item].name}</Col>)
            ) : (
              <Col xs={12} style={{textAlign: 'center'}}>There is no one here</Col>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Lobby;
