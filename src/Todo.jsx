import React, { Component } from "react";
import "./store";
import { connect } from "react-redux";

class Todo extends Component {
  constructor(props) {
    super();
    this.state = {
      id: undefined,
      name: "",
      number: "",
      type: "ADD"
    };
  }
  edit = ({ id, name, number }) => {
    this.setState({
      id,
      name,
      number,
      type: "EDIT"
    });
  };

  render() {
    return (
      <div>
        <div className="form">
          <input
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            id="name"
            type="text"
            placeholder="name"
          />
          <input
            value={this.state.number}
            onChange={e => {
              isNaN(e.target.value) || e.target.value.length > 8
                ? false
                : this.setState({ number: e.target.value });
            }}
            id="number"
            type="text"
            placeholder="phone number"
          />
          <button
            id="btn"
            onClick={() => {
              if (
                this.props.list.filter(
                  x =>
                    x.name === this.state.name && x.number !== this.state.number
                ).length > 0 && this.state.type==="ADD"
              ) {
                alert("name  or number already exist !");
              } else {
                if (this.state.name !== "" && this.state.number.length === 8) {
                  this.props.click(this.state);
                  this.setState({ id: undefined, name: "", number: "" });
                } else {
                  alert(
                    "empty field not allowed and number length must be = 8 !"
                  );
                }
              }
            }}
          >
            {this.state.type}
          </button>
        </div>

        <table className="list">
          <tr className="thead">
            <td>Name</td>
            <td>Number</td>
            <td>action</td>
          </tr>
          {this.props.list.map(x => {
            return (
              <tr>
                <td>{x.name}</td>
                <td>{x.number}</td>
                <td>
                  <span
                    className="delete"
                    onClick={() => {
                      this.props.remove(x.id);
                    }}
                  >
                    delete{" "}
                  </span>{" "}
                  <br />
                  <span className="edit" onClick={() => this.edit(x)}>
                    edit
                  </span>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}
const stateToProps = state => {
  return {
    list: state
  };
};
const disptachToProps = dispatch => {
  return {
    remove: id =>
      dispatch({
        type: "DELETE",
        id
      }),
    click: ({ id, name, number, type }) => {
      id = id === undefined ? Math.floor((1 + Math.random()) * 0x10000) : id;
      dispatch({
        type,
        contact: { id, name, number }
      });
    }
  };
};

export default connect(
  stateToProps,
  disptachToProps
)(Todo);
