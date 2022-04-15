import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'


const NoteItem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    // let date=note.date.toGMTstring();
    // console.log(date);
    return (
        <div className="card-deck col-md-3 my-4">
            <div className="card">
                {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    {/* <i className="fa-solid fa-circle-plus mx-1"></i> */}
                    <i className="fa-brands fa-readme mx-1"></i>
                    {/* <p className="card-text"><small className="text-muted">Last updated at {note.date}</small></p> */}
                    <i className="fa-solid fa-pen-to-square mx-1" onClick={() => { updateNote(note) }}></i>
                    <i className="fa-solid fa-trash-can mx-1" onClick={() => { deleteNote(note._id) }}></i>
                </div>
            </div>
        </div >

    )
}

export default NoteItem
