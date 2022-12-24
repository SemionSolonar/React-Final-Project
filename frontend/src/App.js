import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import ResetPassword from './components/ResetPassword';
import Homepage from './pages/Homepage';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Alert, Container } from 'react-bootstrap';
import { useAuth } from '../src/contexts/AuthContext';

function App() {
  const { currentUser } = useAuth();
  return (
    <>
      <Router>
        <nav>
          <Link to="/" style={{ padding: '5px' }}><button>Home</button></Link>
          <Link to="/login" style={{ padding: '5px' }}><button>Login</button></Link>
          <Link to="/signup" style={{ padding: '5px' }}><button>Sign Up</button></Link>
          <Link to="/profile" style={{ padding: '5px' }}><button>Profile</button></Link>
        </nav>
        <Container style={{ minHeight: '20vh' }} >
          <div style={{ maxWidth: "400px" }}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ResetPassword />} />
              {currentUser ? <Route path="/profile" element={<Profile />} /> : <Route path="/profile" element={<Alert variant='danger'><h1>Please login First</h1></Alert>} />}
              <Route path="*" element={<Alert variant='danger'><h1>404 Not Found</h1></Alert>} />
            </Routes>
          </div>
        </Container>
      </Router>
    </>
  );
}

export default App;
