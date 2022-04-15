// import React, { useContext } from 'react'
// import NoteContext from '../context/notes/NoteContext'
// import AddNote from './AddNote';
import Notes from "./Notes";
const Home = () => {
  // const context = useContext(NoteContext);
  // const { notes, setNotes } = context;
  return (
    <div className="container">
      <Notes />
    </div>
  );
};

export default Home;
