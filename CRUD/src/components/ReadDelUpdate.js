import React from "react";
import fire from "../fire";
import "../css/style.css";

import { Button, Table } from "react-bootstrap";

class ReadDelUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      search: null,
    };
  }

  // read cars from db
  readcars = () => {
    const carsRef = fire.database().ref();
    carsRef.on("value", (snapshot) => {
      let carsList = [];
      var counter = 1;
      snapshot.forEach((data) => {
        var current = data.val();
        carsList.push({
          id: data.key,
          generatedId: counter++,
          title: current.title,
          author: current.author,
          isbn: current.isbn,
        });
      });
      this.setState({ cars: carsList }, () => console.log(this.state.cars));
    });
  };

  // handles dynamic input change for update
  handleChange = (event, index) => {
    const name = event.target.name; // tittle, author, isbn
    const value = event.target.value;
    let updatedcars = this.state.cars;
    updatedcars[index][name] = value;
    this.setState({ cars: updatedcars });
    console.log(this.state.cars[index]);
  };

  // updates changed values to db
  handleUpdate = (id, index) => {
    const carsRef = fire.database().ref().child(id);
    if (window.confirm("Confirm update ?")) {
      carsRef.update(this.state.cars[index]);
      this.readcars();
    }
  };

  // deletes car from db
  handleDelete = (id) => {
    const carRef = fire.database().ref().child(id);
    if (window.confirm("Confirm Delete ?")) {
      carRef.remove();
      this.readcars();
    }
  };

  // handles input for search box
  handleSearchInput = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  // Call read function once the component gets mounted
  componentWillMount() {
    this.readcars();
  }

  render() {
    return (
      <div id="table">
        <input
          type="search"
          placeholder=" Search for car"
          id="searchbox"
          onChange={(e) => this.handleSearchInput(e)}
        ></input>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>car NAME</th>
              <th>AUTHOR NAME</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cars
              .filter((b) => {
                if (this.state.search == null) return b;
                else if (
                  b.title
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase())
                ) {
                  return b;
                }
              })
              .map((car, index) => (
                <tr key={car.id}>
                  <td>{car.generatedId}</td>
                  <td>
                    <input
                      type="text"
                      name="title"
                      onChange={(event) => this.handleChange(event, index)}
                      defaultValue={car.title}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="author"
                      onChange={(event) => this.handleChange(event, index)}
                      defaultValue={car.author}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="isbn"
                      onChange={(event) => this.handleChange(event, index)}
                      defaultValue={car.isbn}
                    />
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => this.handleUpdate(car.id, index)}
                    >
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => this.handleDelete(car.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ReadDelUpdate;
