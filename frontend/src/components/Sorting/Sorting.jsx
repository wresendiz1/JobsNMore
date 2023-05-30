/* eslint-disable react/prop-types */
import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";

function Sorting({ sortValues, searchValues, page, handler }) {
  return (
    <Container>
      <Row className="d-flex flex-wrap justify-content-center py-4">
        <Col>
          <Form
            onSubmit={(e) => {
              // NOTE: uncontrolled input is used here because lazy, react recommends using controlled input
              // https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components
              e.preventDefault();
              const formData = new FormData(e.target);
              const formDataObj = Object.fromEntries(formData.entries());
              formDataObj.search = formDataObj.search.trim();
              // console.log(formDataObj);
              handler(formDataObj);
            }}
          >
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingSelect" label="Sort by:">
                <Form.Select aria-label="Sort:" name="sort_by">
                  {page &&
                    sortValues.map((obj) => (
                      <option key={obj.id} value={obj.id}>
                        {obj.name}
                      </option>
                    ))}
                  ;
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingSelect" label="Order:">
                <Form.Select aria-label="Order:" name="order">
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row className="g-2">
                <Col md>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Search"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="test"
                      name="search"
                    />
                  </FloatingLabel>
                </Col>
                <Col md>
                  <FloatingLabel controlId="floatingSelect" label="Search by:">
                    <Form.Select aria-label="Search:" name="search_by">
                      {page &&
                        searchValues.map((obj) => (
                          <option key={obj.id} value={obj.id}>
                            {obj.name}
                          </option>
                        ))}
                      ;
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
            </Form.Group>

            <Button variant="outline-info" type="submit">
              Go
            </Button>
          </Form>
          <br />
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default Sorting;
