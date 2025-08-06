import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { adminUsers } from '../super_admin/super_admin';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    const admin = adminUsers.find(
      user => user.email === email && user.password === password
    );

    if (admin) {
      // Store admin info in localStorage
      localStorage.setItem('adminUser', JSON.stringify({
        name: admin.name,
        role: admin.role,
        email: admin.email
      }));
      
      navigate('/Dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.logo}>🌿 KrushiMandi</h1>
        </div>
        <div style={styles.body}>
          <h2 style={styles.title}>Admin Login</h2>
          
          {error && <p style={styles.error}>{error}</p>}

          <form onSubmit={handleLogin}>
            <div style={styles.inputBox}>
              <FaEnvelope style={styles.icon} />
              <input 
                type="email" 
                placeholder="Email" 
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div style={styles.inputBox}>
              <FaLock style={styles.icon} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div style={styles.forgot}>
              <Link to="/ForgotPassword">Forgot Password?</Link>
            </div>

            <button type="submit" style={styles.button}>Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
};
const styles = {
  page: {
    backgroundColor: '#d8e9e7',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#ef4444',
    backgroundColor: '#fee2e2',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  card: {
    width: '350px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#0f5954',
    padding: '20px',
    textAlign: 'center',
  },
  logo: {
    color: '#fff',
    margin: 0,
    fontSize: '24px',
  },
  body: {
    padding: '30px 25px',
  },
  title: {
    fontSize: '28px',
    color: '#035b5b',
    marginBottom: '30px',
  },
  inputBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    padding: '10px 12px',
    marginBottom: '18px',
    border: '1px solid #ddd',
    position: 'relative',
  },
  icon: {
    marginRight: '10px',
    color: '#888',
  },
  input: {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    flex: 1,
    fontSize: '15px',
  },
  eyeIcon: {
    color: '#888',
    cursor: 'pointer',
  },
  forgot: {
    textAlign: 'right',
    fontSize: '13px',
    marginBottom: '18px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#0f5954',
    color: '#fff',
    fontWeight: '600',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  footerText: {
    textAlign: 'center',
    marginTop: '25px',
    fontSize: '14px',
  },
  signupLink: {
    color: '#0f5954',
    fontWeight: '600',
    textDecoration: 'none',
  },
};

export default AdminLogin;