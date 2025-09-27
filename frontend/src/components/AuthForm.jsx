import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const AuthForm = ({ type, onSubmit }) => {
  const isRegister = type === 'register';

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="text-center">{isRegister ? 'Register' : 'Login'}</Card.Title>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" required />
          </Form.Group>

          {isRegister && (
            <>
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstName" placeholder="Enter first name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" placeholder="Enter last name" />
              </Form.Group>
            </>
          )}
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              {isRegister ? 'Sign Up' : 'Login'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AuthForm;