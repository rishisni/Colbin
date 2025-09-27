import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import { Container, Row, Col } from 'react-bootstrap';
import { useToast } from '../context/ToastContext.jsx'; // Import the hook

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast(); // Use the toast hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      await login({ email: email.value, password: password.value });
      showToast('Login successful!', 'success'); // Show success toast
      navigate('/profile');
    } catch (err) {
      showToast(err.response?.data?.message || 'Login failed. Please try again.', 'danger'); // Show error toast
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <AuthForm type="login" onSubmit={handleSubmit} />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;