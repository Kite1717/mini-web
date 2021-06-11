import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Form, Table, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
function AddExercises() {

    const [loading, setloading] = useState(false);
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
      //get all books
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    setloading(true);
    axios
      .get("http://localhost:4000/api/book/all")
      .then(({ data }) => {
        if (data.books.length > 0) {
          setBooks(data.books);
          setloading(false);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong",
        });
        setloading(false);
      });
  };


    return (
        <Row>
      <Col xs={12} md={6}>
          <h3>Selected Book : {selectedBook?.bookName}</h3>
        <Form >
          <Form.Group className="mb-3">
            <Form.Label>Exercise Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter exercise name"
            />
          </Form.Group>

          <Button disabled={!selectedBook} variant="primary" type="submit">
            Add Exercise
          </Button>
        </Form>
      </Col>
      <Col xs={12} md={6}>
        {loading ? (
          <Spinner animation="border" variant="info" />
        ) : (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Book Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.bookName}</td>
                    <td>
                      <Button
                        onClick={() => setSelectedBook(item)}
                        variant="info"
                      >
                        Select
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Col>

    </Row>
    )
}

export default AddExercises
