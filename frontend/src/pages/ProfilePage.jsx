import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../api';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Spinner, Row, Col } from 'react-bootstrap';

const ProfilePage = () => {
  const { user, setUser, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
        navigate('/login');
      }
    };
    if (isAuthenticated && !user) {
      fetchProfile();
    } else if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate, setUser, user]);

  if (isLoading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <div>Loading profile...</div>
      </Container>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center">Your Profile</Card.Title>
              <Card.Text>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>First Name:</strong> {user.firstName || 'N/A'}</p>
                <p><strong>Last Name:</strong> {user.lastName || 'N/A'}</p>
                <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                <p><strong>Last Logged In:</strong> {user.lastLoggedAt ? new Date(user.lastLoggedAt).toLocaleString() : 'N/A'}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;