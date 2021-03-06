import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initialNote = [];
    const [notes, setNotes] = useState(initialNote);


    // Get All Notes
    const GetAllNotes = async () => {
        // API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            // body: JSON.stringify({title,description, tag})
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    };

    //Add a note
    const addNote = async (title, description, tag) => {
        // console.log("adding a note");
        //API CAll
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }


    // Delete a note
    const deleteNote = async (id) => {
        // API CALL

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            //   body: JSON.stringify({ title, description, tag }),
        });
        let json = await response.json();
        console.log(json)
        // console.log("deleting this note with id: " + id);
        let newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);
    };



    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json)
        // Logic to edit in client
        let NewNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < NewNotes.length; index++) {
            const element = NewNotes[index];
            if (element._id === id) {
                NewNotes[index].title = title;
                NewNotes[index].description = description;
                NewNotes[index].tag = tag;
                break;
            }
        }
        setNotes(NewNotes);
    };


    return (
        <NoteContext.Provider
            value={{ notes, setNotes, editNote, deleteNote, GetAllNotes, addNote }}
        >
            {props.children}
        </NoteContext.Provider>
    )
};
export default NoteState;
