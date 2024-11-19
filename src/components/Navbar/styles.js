import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--dark-bg);
  box-shadow: 0 2px 5px rgba(92,225,230,0.2);
  padding: 15px 30px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`

export const TimeWelcome = styled.div`
  flex: 1;
  font-size: 1.5rem;
  color: var(--text-light);
  
  h1 {
    margin: 0;
    font-size: 1.8rem;
  }
  
  p {
    margin: 5px 0;
    font-size: 1.2rem;
    color: var(--text-secondary);
  }
`

export const LogoText = styled(Link)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #5ce1e6;
  font-size: 2rem;
  text-decoration: none;
  font-weight: bold;
  background: linear-gradient(90deg, #1a1a1a 0%, #5CE1E6 50%, #E5E6E2 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;
  
  &:hover {
    background-position: right center;
  }
`

export const AuthSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`

export const AuthButtons = styled.div`
  display: flex;
  gap: 10px;
`

export const AuthButton = styled.button`
  background: ${props => props.primary ? 'var(--theme-color)' : 'transparent'};
  color: ${props => props.primary ? 'var(--dark-bg)' : 'var(--theme-color)'};
  border: 2px solid var(--theme-color);
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(92,225,230,0.3);
  }
`

export const LogoutButton = styled(AuthButton)`
  background: transparent;
  color: var(--theme-color);
  
  &:hover {
    background: rgba(92, 225, 230, 0.1);
  }
`

export const MyPageButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid var(--theme-color);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`