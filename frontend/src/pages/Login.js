import { useState } from "react";
import { styled } from '@mui/material/styles';
// import { login } from "../redux/apiCalls";
// import { mobile } from "../responsive";
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';


const Container = styled('div')({
  width: '100vw',
  height: '100vh',
  background: `linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ), url("https://www.pixelstalk.net/wp-content/uploads/2016/06/Book-desktop-wallpaper-images-hd-wallpapers.jpg") center`,
  backgroundSize: 'cover',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

});

const Wrapper = styled('div')({
  width: '25%',
  padding: '20px',
  backgroundColor: 'white',
  // '@media(max-width: 768px)': {
  //   width: '75%',
  // },
});

const Title = styled('h1')({
  fontSize: '24px',
  fontWeight: 300,
});

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

const Input = styled('input')({
  flex: 1,
  minWidth: '40%',
  margin: '10px 0',
  padding: '10px',
});

const Button = styled('button')({
  width: '40%',
  border: 'none',
  padding: '15px 20px',
  backgroundColor: 'teal',
  color: 'white',
  cursor: 'pointer',
  marginBottom: '10px',
  '&:disabled': {
    color: 'green',
    cursor: 'not-allowed',
  },
});

const Link = styled('a')({
  margin: '5px 0px',
  fontSize: '12px',
  textDecoration: 'underline',
  cursor: 'pointer',
});

const Error = styled('span')({
  color: 'red',
});

const Login = () => {
  const { login, currentUser } = useAuth();
  const [error, setError] = useState('')
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(emailRef.current.value, passwordRef.current.value).then((user) => {
        navigate('/');
      })
    } catch (error) {
      setError(error.message);
    }

  }
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleLogin}>
          <Input placeholder="Email" ref={emailRef} />
          <Input placeholder="Password" type="password" ref={passwordRef} />
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link onClick={() => navigate("/register")}>CREATE A NEW ACCOUNT</Link>
          <Button type="submit" >LOGIN</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
