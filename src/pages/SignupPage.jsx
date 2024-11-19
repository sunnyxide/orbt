import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const SignupContainer = styled.div`
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
  background: linear-gradient(135deg, #7FE1D7, #5CC6BA);
  border-radius: 50%;
  margin: 40px 0;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const SignupForm = styled.form`
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  background-color: white;
  
  &:focus {
    border-color: #5CC6BA;
  }
`;

const InputLabel = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 10px;
  background: #5CC6BA;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  
  &:hover {
    background: #4BB5A8;
  }
`;

const BackButton = styled.button`
  width: 100%;
  padding: 15px;
  border: 1px solid #5CC6BA;
  border-radius: 10px;
  background: white;
  color: #5CC6BA;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 8px 0;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const GoogleButton = styled(SocialButton)`
  background-color: white;
  color: #757575;
  border: 1px solid #dadce0;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const AppleButton = styled(SocialButton)`
  background-color: black;
  color: white;
  
  &:hover {
    background-color: #1a1a1a;
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  color: #666;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e0e0e0;
  }
  
  span {
    padding: 0 10px;
    font-size: 14px;
  }
`;

const VerificationButton = styled.button`
  padding: 15px 20px;
  border: 1px solid #5CC6BA;
  border-radius: 10px;
  background: white;
  color: #5CC6BA;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f5f5f5;
  }
  
  &:disabled {
    background: #f5f5f5;
    border-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
  }
`;

const VerificationStatus = styled.span`
  font-size: 14px;
  color: ${props => props.verified ? '#4BB5A8' : '#666'};
  margin-left: 10px;
`;

const InterestsSection = styled(InputGroup)`
  margin-top: 20px;
`;

const InterestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 10px;
`;

const InterestTag = styled.div`
  padding: 10px 15px;
  border-radius: 20px;
  background: ${props => props.active ? '#5CC6BA' : 'transparent'};
  color: ${props => props.active ? 'white' : '#5CC6BA'};
  border: 2px solid #5CC6BA;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(92,198,186,0.3);
  }
`;

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    ethnicity: '',
    location: '',
    age: '',
    interests: []
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [interests] = useState([
    { id: 1, name: 'Stock Market' },
    { id: 2, name: 'Cryptocurrency' },
    { id: 3, name: 'Real Estate' },
    { id: 4, name: 'Global Markets' },
    { id: 5, name: 'Technology' },
    { id: 6, name: 'Banking' }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleInterest = (id) => {
    setFormData(prev => {
      const currentInterests = prev.interests || [];
      const newInterests = currentInterests.includes(id)
        ? currentInterests.filter(i => i !== id)
        : [...currentInterests, id];
      
      return {
        ...prev,
        interests: newInterests
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          ethnicity: formData.ethnicity,
          location: formData.location,
          age: formData.age,
          interests: formData.interests
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userName', data.fullName);
        localStorage.setItem('isLoggedIn', 'true');
        alert('Sign up successful!');
        navigate('/');
      } else {
        alert(data.detail || 'Failed to sign up');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during sign up. Please try again.');
    }
  };

  const handleSendVerification = async () => {
    try {
      if (import.meta.env.MODE === 'development') {
        setShowVerification(true);
        setIsEmailVerified(true);
        alert('Development mode: Email verification completed automatically');
        return;
      }

      const response = await fetch('http://localhost:8000/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email })
      });

      if (response.ok) {
        setShowVerification(true);
        alert('Verification code has been sent to your email');
      } else {
        const error = await response.json();
        alert(error.detail);
      }
    } catch (error) {
      console.error('Verification code sending failed:', error);
      alert('Failed to send verification code');
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const response = await fetch('http://localhost:8000/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          code: verificationCode
        })
      });

      if (response.ok) {
        setIsEmailVerified(true);
        alert('Email verified');
      } 
    } catch (error) {
      console.error('Email verification failed:', error);
      alert('Failed to verify email');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = 'http://localhost:8000/auth/google';
    } catch (error) {
      console.error('Google login failed:', error);
      alert('Failed to login with Google');
    }
  };

  const handleAppleLogin = async () => {
    try {
      window.location.href = 'http://localhost:8000/auth/apple';
    } catch (error) {
      console.error('Apple login failed:', error);
      alert('Failed to login with Apple');
    }
  };

  return (
    <SignupContainer>
      <LogoCircle to="/" />
      <SignupForm onSubmit={handleSubmit}>
        <GoogleButton type="button" onClick={handleGoogleLogin}>
          <img src="http://localhost:8000/static/images/thumbnails/google_logo.png" alt="Google" />
          Continue with Google
        </GoogleButton>

        <AppleButton type="button" onClick={handleAppleLogin}>
          <img src="http://localhost:8000/static/images/thumbnails/apple_logo.png" alt="Apple" />
          Continue with Apple
        </AppleButton>

        <OrDivider>
          <span>Or</span>
        </OrDivider>

        <InputGroup>
          <InputLabel>Full Name</InputLabel>
          <InputField
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>Email</InputLabel>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <InputField
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isEmailVerified}
            />
            <VerificationButton 
              type="button" 
              onClick={handleSendVerification}
              disabled={!formData.email || isEmailVerified}
            >
              {isEmailVerified ? 'Verified' : 'Send Code'}
            </VerificationButton>
          </div>
          {isEmailVerified && (
            <VerificationStatus verified>
              ✓ Email verified
            </VerificationStatus>
          )}
        </InputGroup>

        {showVerification && !isEmailVerified && (
          <InputGroup>
            <InputLabel>Verification Code</InputLabel>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <InputField
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength="6"
                required
              />
              <VerificationButton 
                type="button" 
                onClick={handleVerifyEmail}
                disabled={verificationCode.length !== 6}
              >
                Verify
              </VerificationButton>
            </div>
          </InputGroup>
        )}

        <InputGroup>
          <InputLabel>Password</InputLabel>
          <InputField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>Confirm Password</InputLabel>
          <InputField
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength="6"
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>Ethnicity</InputLabel>
          <InputField
            type="text"
            name="ethnicity"
            value={formData.ethnicity}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>Location</InputLabel>
          <InputField
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>Age</InputLabel>
          <InputField
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="1"
            max="120"
          />
        </InputGroup>

        <InterestsSection>
          <InputLabel>Select Your Interests</InputLabel>
          <InterestsGrid>
            {interests.map(interest => (
              <InterestTag
                key={interest.id}
                active={formData.interests.includes(interest.id)}
                onClick={() => toggleInterest(interest.id)}
              >
                {interest.name}
              </InterestTag>
            ))}
          </InterestsGrid>
        </InterestsSection>

        <SubmitButton 
          type="submit" 
          disabled={!isEmailVerified}
        >
          {isEmailVerified ? 'Create Account' : 'Verify Email to Continue'}
        </SubmitButton>
        
        <BackButton 
          type="button" 
          onClick={() => navigate('/account')}
        >
          Back to Login
        </BackButton>
      </SignupForm>
    </SignupContainer>
  );
}

export default SignupPage;