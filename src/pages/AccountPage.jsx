import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AccountContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const ProfileSection = styled.div`
  background: var(--dark-bg);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`;

const InterestsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const InterestTag = styled.div`
  padding: 10px 15px;
  border-radius: 20px;
  background: ${props => props.active ? 'var(--theme-color)' : 'transparent'};
  color: ${props => props.active ? 'var(--dark-bg)' : 'var(--theme-color)'};
  border: 2px solid var(--theme-color);
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(92,225,230,0.3);
  }
`;

const LogoutButton = styled.button`
  background: transparent;
  color: var(--theme-color);
  border: 2px solid var(--theme-color);
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--theme-color);
    color: var(--dark-bg);
  }
`;

function AccountPage({ onLogout }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [interests, setInterests] = useState([
    { id: 1, name: 'Stock Market', active: true },
    { id: 2, name: 'Cryptocurrency', active: false },
    { id: 3, name: 'Real Estate', active: true },
    { id: 4, name: 'Global Markets', active: false },
    { id: 5, name: 'Technology', active: true },
    { id: 6, name: 'Banking', active: false },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const toggleInterest = (id) => {
    setInterests(interests.map(interest =>
      interest.id === id
        ? { ...interest, active: !interest.active }
        : interest
    ));
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <AccountContainer>
      <ProfileSection>
        <h2>Profile</h2>
        <p>Name: {userData.fullName}</p>
        <p>Email: {userData.email}</p>
      </ProfileSection>

      <ProfileSection>
        <h2>Interests</h2>
        <InterestsGrid>
          {interests.map(interest => (
            <InterestTag
              key={interest.id}
              active={interest.active}
              onClick={() => toggleInterest(interest.id)}
            >
              {interest.name}
            </InterestTag>
          ))}
        </InterestsGrid>
      </ProfileSection>

      <LogoutButton onClick={handleLogout}>
        Logout
      </LogoutButton>
    </AccountContainer>
  );
}

AccountPage.propTypes = {
  onLogout: PropTypes.func
};

AccountPage.defaultProps = {
  onLogout: () => {}
};

export default AccountPage;