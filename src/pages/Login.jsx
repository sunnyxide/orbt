import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import orbtLogo from '../assets/orbt.jpg';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const LogoCircle = styled(Link)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 40px 0;
  cursor: pointer;
  transition: transform 0.3s ease;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
  background-color: rgba(255, 68, 68, 0.1);
  text-align: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  
  &:focus {
    border-color: #5CC6BA;
  }
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  
  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  &:hover {
    background: #f8f9fa;
    transform: translateY(-1px);
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 15px;
  margin: 20px 0;
  border: none;
  border-radius: 10px;
  background: #5CC6BA;
  color: white;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background: #4BB5A8;
  }
`;

const SignUpLink = styled(Link)`
  color: #5CC6BA;
  text-decoration: none;
  text-align: center;
  display: block;
  margin-top: 20px;
  
  &:hover {
    text-decoration: underline;
  }
`;

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Attempting login with:', formData);

      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
        credentials: 'include'
      });

      const data = await response.json();
      console.log('Backend response:', data);

      if (response.ok) {
        console.log('Login successful, calling onLogin');
        await onLogin(data);
      } else {
        throw new Error(data.detail || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    try {
      window.location.href = `http://localhost:8000/auth/${provider}`;
    } catch (error) {
      console.error(`${provider} login error:`, error);
      alert(`Failed to login with ${provider}`);
    }
  };

  // 계정 확인을 위한 디버깅 함수
  const checkAccounts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/debug/users');
      const data = await response.json();
      console.log('Registered accounts:', data);
    } catch (error) {
      console.error('Error checking accounts:', error);
    }
  };

  useEffect(() => {
    checkAccounts();
  }, []);

  return (
    <LoginContainer>
      <LogoCircle to="/">
        <img src={orbtLogo} alt="Orbt Logo" />
      </LogoCircle>
      <LoginForm onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <InputField 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email" 
          required
          disabled={isLoading}
        />
        
        <InputField 
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password" 
          required
          disabled={isLoading}
        />
        
        <LoginButton type="submit" disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </LoginButton>
        
        <SocialButton type="button" onClick={() => handleSocialLogin('google')}>
          <img src="http://localhost:8000/static/images/thumbnails/google_logo.png" alt="Google" />
          Sign Up with Google
        </SocialButton>
        
        <SocialButton type="button" onClick={() => handleSocialLogin('apple')}>
          <img src="http://localhost:8000/static/images/thumbnails/apple_logo.png" alt="Apple" />
          Sign Up with Apple
        </SocialButton>
        
        <SignUpLink to="/signup">Sign Up</SignUpLink>
      </LoginForm>
    </LoginContainer>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Login; 