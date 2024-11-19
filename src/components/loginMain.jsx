import { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation

// 컴포넌트 이름을 대문자로 변경
const LoginMain = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 처리 함수
  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logged in with ${email}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.logo}></div>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <div style={styles.providerButtons}>
          <button type="button" style={styles.providerButton}>
            Sign Up with Google
          </button>
          <button type="button" style={styles.providerButton}>
            Sign Up with Apple
          </button>
        </div>
        <button type="submit" style={styles.submitButton}>
          Log in
        </button>
        <Link to="/signup" style={styles.signUpButton}>
          Don`&apos;`t have an account? Sign Up
        </Link>
      </form>
    </div>
  );
};

// 스타일 객체 정의
const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  providerButtons: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '10px',
  },
  providerButton: {
    padding: '10px',
    fontSize: '14px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '45%',
  },
  submitButton: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  signUpButton: {
    display: 'block',
    marginTop: '10px',
    color: '#4CAF50',
    textDecoration: 'none',
    fontSize: '14px',
  },
};

export default LoginMain;
