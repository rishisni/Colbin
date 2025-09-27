import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container className="my-5 text-center">
      <Row>
        <Col>
          <h1>Welcome to Colbin</h1>
          <p className="lead">The AI-powered technical recruitment platform.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;