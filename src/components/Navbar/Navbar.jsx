import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  NavContainer, 
  LogoText, 
  TimeWelcome, 
  AuthSection, 
  AuthButtons,
  AuthButton,
  LogoutButton,
  MyPageButton 
} from './styles';
import { ORBIT_LOGO } from '../../constants';

const Navbar = ({ isAuthenticated, userName, currentTime, onLogout }) => {
  const navigate = useNavigate();
  
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  return (
    <NavContainer>
      <TimeWelcome>
        {isAuthenticated ? (
          <h1>Good {getTimeOfDay()}, {userName}!</h1>
        ) : (
          <h1>Welcome to Orbt</h1>
        )}
        <p>{currentTime.toLocaleTimeString()}</p>
      </TimeWelcome>

      <LogoText to="/">Orbt</LogoText>

      <AuthSection>
        {isAuthenticated ? (
          <>
            <LogoutButton onClick={onLogout}>
              Logout
            </LogoutButton>
            <MyPageButton onClick={() => navigate('/account')}>
              <img src={ORBIT_LOGO} alt="Profile" />
            </MyPageButton>
          </>
        ) : (
          <AuthButtons>
            <AuthButton onClick={() => navigate('/login')}>
              Log In
            </AuthButton>
            <AuthButton primary onClick={() => navigate('/signup')}>
              Sign Up
            </AuthButton>
          </AuthButtons>
        )}
      </AuthSection>
    </NavContainer>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  currentTime: PropTypes.instanceOf(Date).isRequired,
  onLogout: PropTypes.func.isRequired
};

Navbar.defaultProps = {
  userName: '',
  currentTime: new Date()
};

export default Navbar;