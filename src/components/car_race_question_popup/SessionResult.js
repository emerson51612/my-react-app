import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WEBSOCKET_BASE_URL } from "../../utility/Axios";
import Lobby from "./Lobby";
import Result from "./Result";
import "./car_race_question_popup.css";

const SessionResult = ({ setTitle }) => {
  // Init websocket
  const { id } = useParams();
  useEffect(() => {
    setTitle("Session View");
    let socket = new WebSocket(
      `${WEBSOCKET_BASE_URL}/api/v1/session/ws_user/${id}`
    );
    socket.onopen = () => {
      console.log("Websocket opened");
    };
    socket.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.session_status) {
        // Mean first return message
        setStatus(data.session_status);
        if (data.session_status == "ENDED") {
          setSessionName(data.car_race_session_name);
          setPlayerData(data.result.results);
          setRanking(data.result.ranking);
        } else {
          setSessionName(data.session_name);
          setPlayerData(data.client_data);
          setRanking(data.ranking);
          if (data.session_status === "CREATED") {
            setPlayerList(data.client_list);
          }
        }
      } else {
        // Following update message
        const topic = data.event;
        const message_value = data.value;
        if (topic === "update_status") {
          setStatus(message_value);
        } else if (topic === "client_update_users") {
          setPlayerList(message_value.player_list);
          setPlayerData(message_value.data);
        } else if (topic === "client_update_result") {
          setPlayerData(message_value.data);
          setRanking(message_value.ranking);
        }
      }
    };
    socket.onclose = () => {
      console.log("Websocket closed");
    };
    socket.onerror = (e) => {
      console.log(e);
    };
  }, []);

  // Data
  const [sessionName, setSessionName] = useState("");
  const [status, setStatus] = useState("CREATED");
  const [playerList, setPlayerList] = useState([]);
  const [playerData, setPlayerData] = useState({});
  const [ranking, setRanking] = useState([]);
  return (
    <div>
      {status === "CREATED" && (
        <Lobby
          playerList={playerList}
          playerData={playerData}
          sessionName={sessionName}
        />
      )}
      {status !== "CREATED" && (
        <Result ranking={ranking} playerData={playerData} />
      )}
    </div>
  );
};

export default SessionResult;
