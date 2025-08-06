import React, { useState } from 'react';
import { FaEnvelope, FaMobileAlt } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [method, setMethod] = useState('email'); // 'email' or 'mobile'
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (method === 'email') {
      alert(`Reset link sent to ${input}`);
    } else {
      alert(`OTP sent to mobile ${input}`);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.logo}>🌿 KrushiMandi</h1>
        </div>
        <div style={styles.body}>
          
          <h2 style={styles.title}>Forgot Password</h2>

          {/* Tabs */}
          <div style={styles.tabs}>
            <button
              style={{
                ...styles.tab,
                backgroundColor: method === 'email' ? '#0f5954' : '#f0f0f0',
                color: method === 'email' ? '#fff' : '#333',
              }}
              onClick={() => setMethod('email')}
            >
              Email
            </button>
            <button
              style={{
                ...styles.tab,
                backgroundColor: method === 'mobile' ? '#0f5954' : '#f0f0f0',
                color: method === 'mobile' ? '#fff' : '#333',
              }}
              onClick={() => setMethod('mobile')}
            >
              Mobile
            </button>
          </div>

          {/* Input Box */}
          <div style={styles.inputBox}>
            {method === 'email' ? <FaEnvelope style={styles.icon} /> : <FaMobileAlt style={styles.icon} />}
            <input
              type={method === 'email' ? 'email' : 'tel'}
              placeholder={method === 'email' ? 'Enter your email' : 'Enter mobile number'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={styles.input}
            />
          </div>

          <button onClick={handleSubmit} style={styles.button}>
            {method === 'email' ? 'Send Reset Link' : 'Send OTP'}
          </button>

          <p style={styles.backToLogin} onClick={() => navigate('/')}>
            Back to login
          </p>

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
    marginBottom: '20px',
  },
  tabs: {
    display: 'flex',
    marginBottom: '20px',
    borderRadius: '8px',
    overflow: 'hidden',
    marginTop: '40px',
  },
  tab: {
    flex: 1,
    padding: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
  },
  inputBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    padding: '10px 12px',
    marginBottom: '18px',
    border: '1px solid #ddd',
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
  backToLogin: {
    color: '#035b5b',
    textAlign: 'center',
    marginTop: '20px',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default ForgotPassword;