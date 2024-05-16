import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WEBSOCKET_BASE_URL } from "../../utility/Axios";
import CarRaceQuestionPopup from "./CarRaceQuestionPopup";
import EnterName from "./EnterName";
import Lobby from "./Lobby";
import Result from "./Result";
import "./car_race_question_popup.css";

const SessionForGuest = () => {
  // Init websocket
  const { id } = useParams();
  const [beforeEnterName, setBeforeEnterName] = useState(true);
  const [guestName, setGuestName] = useState("");
  const [theme, setTheme] = useState("modern");
  const [websocket, setWebSocket] = useState(null);
  useEffect(() => {
    let uid = localStorage.getItem("uid");
    console.log(uid);
    if (!uid) {
      uid = crypto.randomUUID();
      localStorage.setItem("uid", uid);
    }
    let socket = new WebSocket(
      `${WEBSOCKET_BASE_URL}/api/v1/session/ws_guest/${id}/${uid}`
    );
    socket.onopen = () => {
      console.log("Websocket opened");
    };
    socket.onmessage = (e) => {
      let data = JSON.parse(e.data);
      console.log(data);
      if (data.session_status) {
        // Mean first return message
        setStatus(data.session_status);
        if (data.session_status === "ENDED") {
          setSessionName(data.car_race_session_name);
          setPlayerData(data.result.results);
          setRanking(data.result.ranking);
        } else {
          if (data.session_status === "STARTED") {
            const local_question = localStorage.getItem("questions");
            if (!local_question || local_question === "[]") {
              setQuestions(data.questions);
              localStorage.setItem("questions", JSON.stringify(data.questions));
            } else {
              setQuestions(JSON.parse(local_question));
            }
          } else {
            setQuestions(data.questions);
            localStorage.setItem("questions", "");
          }
          setSessionName(data.session_name);
          setBonus(data.bonus);
          setPenalty(data.penalty);
          setPlayerList(data.client_list);
          setPlayerData(data.client_data);
          setRanking(data.ranking);
          if (Object.keys(data.client_data).includes(uid)) {
            setBeforeEnterName(false);
            setGuestName(data.client_data[uid].name);
            socket.send(JSON.stringify(data.client_data[uid]));
            if (data.client_data[uid].point === data.questions.length && data.session_status === "STARTED") {
              setStatus('ENDED');
            }
          }
        }
      } else {
        // Following update message
        const topic = data.event;
        const message_value = data.value;
        if (topic === "update_status") {
          setStatus(message_value);
          if (message_value === "STARTED") {
            localStorage.setItem("questions", JSON.stringify(questions));
          }
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
    setWebSocket(socket);
  }, []);

  // Data
  const [sessionName, setSessionName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState("CREATED");
  const [bonus, setBonus] = useState(0.0);
  const [penalty, setPenalty] = useState(0.0);
  const [playerList, setPlayerList] = useState([]);
  const [playerData, setPlayerData] = useState({});
  const [ranking, setRanking] = useState([]);

  // Game event
  const onEnterName = (name) => {
    if (websocket) {
      const uid = localStorage.getItem("uid");
      const sendData = {
        uid: uid,
        name: name,
        point: 0,
        time: "00:00:00.000",
      };
      websocket.send(JSON.stringify(sendData));
      setBeforeEnterName(false);
    }
  };

  return (
    <div>
      {beforeEnterName && status === "CREATED" && (
        <EnterName
          setTheme={setTheme}
          setGuestName={setGuestName}
          onEnterName={onEnterName}
        />
      )}
      {!beforeEnterName && status === "CREATED" && (
        <Lobby
          playerList={playerList}
          playerData={playerData}
          sessionName={sessionName}
        />
      )}
      {status === "STARTED" && questions.length > 0 && (
        <CarRaceQuestionPopup
          setQuestions={setQuestions}
          questions={questions}
          bonus={bonus}
          penalty={penalty}
          playerData={playerData}
          ranking={ranking}
          theme={theme}
          websocket={websocket}
          setStatus={setStatus}
        />
      )}
      {status === "ENDED" && (
        <Result
          ranking={ranking}
          playerData={playerData}
        />
      )}
    </div>
  );
};

export default SessionForGuest;
