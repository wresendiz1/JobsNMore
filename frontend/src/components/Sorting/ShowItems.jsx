/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import React from "react";
import { Container, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import Show from "./Show";

function ShowItems({ pageName, page, showHandler, maxItems }) {
  return (
    <>
      <Container fluid className="bg-gradient3">
        <Container className="py-5 align-items-center">
          <Row>
            <Col>
              <h1 className="py-5 fw-light">
                Search Results for:{" "}
                <small className="fw-bold">{pageName}</small>
              </h1>
              {pageName !== "Clusters" ? (
                <>
                  {page && <Show page={page} />}
                  <Form
                    onChange={(e) => {
                      // console.log(e.target.value);
                      e.preventDefault();
                      showHandler(e.target.value);
                    }}
                  >
                    <Form.Group className="mb-3" style={{ width: "10vw" }}>
                      <FloatingLabel
                        controlId="floatingSelect"
                        label="Show items:"
                      >
                        {maxItems === 30 ? (
                          <Form.Select aria-label="Show items:">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                          </Form.Select>
                        ) : (
                          <Form.Select aria-label="Show items:">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </Form.Select>
                        )}
                      </FloatingLabel>
                    </Form.Group>
                  </Form>
                </>
              ) : null}
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default ShowItems;
