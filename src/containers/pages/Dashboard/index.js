import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  createData,
  getData,
  UpdateNote,
  DeleteNote,
} from "../../../config/redux/action";
import "./dashboard.css";
import swal from "sweetalert2";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Swal from "sweetalert2";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    textBtn: "Simpan",
    noteId: "",
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    this.props.getNotes(userData.uid);
  }

  handleSaveNotes = () => {
    const { title, content, textBtn, noteId } = this.state;
    const { saveNotes, editNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));

    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid,
    };
    // saveNotes(data);

    if (textBtn === "Simpan") {
      saveNotes(data);
    } else {
      data.noteId = noteId;
      editNotes(data);
    }
  };
  handleChangeInput = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  };
  editNotes = (note) => {
    this.setState({
      title: note.data.title,
      content: note.data.content,
      textBtn: "Update",
      noteId: note.id,
    });
  };

  cancelUpdate = () => {
    this.setState({
      title: "",
      content: "",
      textBtn: "Simpan",
    });
  };

  deleteNote = (e, note) => {
    e.stopPropagation();
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const { deleteNote } = this.props;
          const userData = JSON.parse(localStorage.getItem("userData"));
          const data = {
            userId: userData.uid,
            noteId: note.id,
          };
          deleteNote(data);
          this.setState({
            title: "",
            content: "",
          });
          window.location.reload();
          swal.fire("Deleted!", "Your file has been deleted.", "success");
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === swal.DismissReason.cancel
        ) {
          swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
        }
      });
  };

  render() {
    const { title, content, date, textBtn } = this.state;
    const { notes } = this.props;
    const { editNotes, cancelUpdate, deleteNote } = this;
    return (
      <div className="container">
        <Link to="/">Logout</Link>
        <div className="row">
          <div className="col-md-7 mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Judul to-do..."
              value={title}
              onChange={(e) => this.handleChangeInput(e, "title")}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Kegiatan..."
              value={content}
              onChange={(e) => this.handleChangeInput(e, "content")}
            />
            <div className="container">
              {textBtn === "Update" ? (
                <button
                  type="submit"
                  className="btn btn-warning mt-3 mx-2"
                  onClick={this.cancelUpdate}
                >
                  Batal
                </button>
              ) : null}
              <button
                type="submit"
                className="btn btn-primary mt-3"
                onClick={this.handleSaveNotes}
              >
                {this.state.textBtn}
              </button>
            </div>
          </div>
        </div>
        {notes.length > 0 ? (
          <Fragment>
            {notes.map((note) => {
              return (
                <div
                  className="card col-md-7"
                  style={{ cursor: "pointer" }}
                  key={note.id}
                  onClick={() => editNotes(note)}
                >
                  <div className="card-body ">
                    <p className="card-title">{note.data.title}</p>
                    {/* <p className="card-subtitle">{note.data.date}</p> */}
                    <p className="card-subtitle">{note.data.content}</p>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => deleteNote(e, note)}
                  >
                    &times;
                  </button>
                </div>
              );
            })}
          </Fragment>
        ) : (
          <h3 className="text-muted">To-do kosong, buat baru?</h3>
        )}
      </div>
    );
  }
}

const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
  saveNotes: (data) => dispatch(createData(data)),
  getNotes: (data) => dispatch(getData(data)),
  editNotes: (data) => dispatch(UpdateNote(data)),
  deleteNote: (data) => dispatch(DeleteNote(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
