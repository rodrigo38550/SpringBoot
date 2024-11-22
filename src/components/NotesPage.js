import React, { useState, useEffect } from "react";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
  fetchCurrentUser,
} from "../services/api";
import NoteForm from "./NoteForm";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userResponse = await fetchCurrentUser();
        setUser(userResponse.data);
        const notesResponse = await fetchNotes();
        setNotes(notesResponse.data);
      } catch (err) {
        setError("Failed to load notes or user");
      }
    };

    loadData();
  }, []);

  const handleCreate = async (content) => {
    const newNote = await createNote(content);
    setNotes([...notes, newNote.data]);
  };

  const handleUpdate = async (id, content) => {
    const updatedNote = await updateNote(id, content);
    setNotes(
      notes.map((note) => (note.id === id ? updatedNote.data : note))
    );
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div>
      <h1>Notes</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <NoteForm onSubmit={handleCreate} />
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content} (Created: {new Date(note.createdAt).toLocaleString()})
            <button onClick={() => handleUpdate(note.id, prompt("Edit note", note.content))}>
              Edit
            </button>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesPage;
