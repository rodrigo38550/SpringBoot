import React, { useState } from "react";

const NoteForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new note"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
