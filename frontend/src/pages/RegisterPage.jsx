import React from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';
import AuthForm from '../components/AuthForm';
import { Container, Row, Col } from 'react-bootstrap';
import { useToast } from '../context/ToastContext.jsx'; // Import the hook

const RegisterPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast(); // Use the toast hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, firstName, lastName } = e.target.elements;
    try {
      await registerUser({ email: email.value, password: password.value, firstName: firstName.value, lastName: lastName.value });
      showToast('Registration successful! Please login.', 'success'); // Show success toast
      navigate('/login');
    } catch (err) {
      showToast(`Registration failed: ${err.response?.data?.message}`, 'danger'); // Show error toast
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <AuthForm type="register" onSubmit={handleSubmit} />
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;