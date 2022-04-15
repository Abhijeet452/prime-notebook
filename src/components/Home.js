// import React, { useContext } from 'react'
// import NoteContext from '../context/notes/NoteContext'
// import AddNote from './AddNote';
import Notes from "./Notes";
const Home = (props) => {
  // const context = useContext(NoteContext);
  // const { notes, setNotes } = context;
  const { showAlert } = props;
  return (
    <div className="container">
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
