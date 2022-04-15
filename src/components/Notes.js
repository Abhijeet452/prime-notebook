import React, { useContext, useEffect, useRef, useState } from 'react'
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import NoteContext from '../context/notes/NoteContext'

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, GetAllNotes, editNote } = context;
    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: "default",
    });
    useEffect(() => {
        GetAllNotes();
        //eslint-disable-next-line
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }
    const handleClick = (e) => {
        console.log("updating the note..", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();

        // addNote(note.title, note.description, note.tag);
    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };
    const ref = useRef(null)
    const refClose = useRef(null)
    return (
        <>
            <AddNote />
            <div className="container">
                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="form-group">
                                        <label htmlFor="etitle">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="etitle"
                                            name="etitle"
                                            value={note.etitle}
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Title"
                                            onChange={onChange} minLength={5} required
                                        />
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="edescription">Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="edescription"
                                            name="edescription"
                                            value={note.edescription}
                                            placeholder="Description"
                                            onChange={onChange} minLength={5} required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="etag">Tag</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="etag"
                                            name="etag"
                                            value={note.etag}
                                            placeholder="Tag"
                                            onChange={onChange} minLength={5} required
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} className="btn btn-primary">Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="container mx-2">
                    {notes.length === 0 && "No Notes to Display"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div >
        </>
    )
}

export default Notes
