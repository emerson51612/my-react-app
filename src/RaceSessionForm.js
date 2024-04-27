import React, { useState } from 'react';

function RaceSessionForm({ onSessionCreated }) {
  const [sessionName, setSessionName] = useState('');
  const [track, setTrack] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!sessionName || !track) return;
    const newSession = { id: Date.now(), name: sessionName, track };
    onSessionCreated(newSession);
    setSessionName('');
    setTrack('');
  };

  return (
    <div>
      <h2>Create Race Session</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="sessionName">Session Name:</label>
        <input
          type="text"
          id="sessionName"
          value={sessionName}
          onChange={(event) => setSessionName(event.target.value)}
          placeholder="Enter session name"
          required
        />
        <label htmlFor="track">Track:</label>
        <input
          type="text"
          id="track"
          value={track}
          onChange={(event) => setTrack(event.target.value)}
          placeholder="Enter track"
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default RaceSessionForm;



