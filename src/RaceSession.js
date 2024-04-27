import React, { useState } from 'react';

function RaceSessionList() {
  const [sessions, setSessions] = useState([]);

  const handleSessionCreated = (newSession) => {
    setSessions([...sessions, newSession]);
  };

  return (
    <div>
      <h2>Race Sessions</h2>
      <ul>
        {sessions.map(session => (
          <li key={session.id}>
            <strong>{session.name}</strong> - {session.track}
          </li>
        ))}
      </ul>
      <RaceSessionForm onSessionCreated={handleSessionCreated} />
    </div>
  );
}

export default RaceSessionList;