import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db, auth } from '../../firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  getAuth 
} from 'firebase/auth';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  setDoc,
  doc 
} from 'firebase/firestore';
import { 
  Modal, 
  Box, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel 
} from '@mui/material';
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash 
} from 'react-icons/fa';


const initialAdminState = {
  name: '',
  email: '',
  phone: '',
  role: 'Admin',
  status: 'pending',
  updatedAt: null,
  lastLoginAt: null
};




export default function AdminLogin() {

  const [signupModal, setSignupModal] = useState(false);
  
  const [newAdmin, setNewAdmin] = useState(initialAdminState);

  const [loading, setLoading] = useState(false);
  
 


  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();



   const handleSignupModalOpen = () => {
    setNewAdmin({ ...newAdmin, email: email, password: password });
    setSignupModal(true);
  };




  const handleSignupModalClose = () => {
    setSignupModal(false);
    setNewAdmin({
      name: '',
      email: '',
      role: 'Admin',
      permissions: 'User Management',
      status: 'active'
    });
  };


const handleNewAdminChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin(prev => ({
      ...prev,
      [name]: value
    }));
  };







const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    // First authenticate with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
    const user = userCredential.user;

    // Then check if user exists in Firestore
    const userDoc = await getDocs(
      query(collection(db, 'users'), 
      where('email', '==', email.trim()))
    );

    if (userDoc.empty) {
      throw new Error('User not found in database');
    }

    const userData = userDoc.docs[0].data();

    // Verify if user is an admin
    if (userData.role !== 'Admin' && userData.role !== 'Super Admin') {
      throw new Error('Unauthorized access');
    }

    // Check if account is active
    if (userData.status !== 'active') {
      throw new Error('Account is not active. Please contact support.');
    }

    // Store admin data in localStorage
    const adminData = {
      uid: user.uid,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: userData.status,
      accessToken: await user.getIdToken()
    };
    
    localStorage.setItem('adminUser', JSON.stringify(adminData));

    // Update last login
    await setDoc(doc(db, 'users', user.uid), {
      lastLoginAt: new Date().toISOString()
    }, { merge: true });

    navigate('/Dashboard');

  } catch (error) {
    console.error('Login error:', error);
    
    switch(error.code || error.message) {
      case 'auth/invalid-credential':
      case 'auth/invalid-email':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        setError('Invalid email or password');
        break;
      case 'auth/too-many-requests':
        setError('Too many failed attempts. Please try again later');
        break;
      case 'User not found in database':
        setError('Account not found in system');
        break;
      case 'Unauthorized access':
        setError('This account does not have admin access');
        break;
      case 'Account is not active. Please contact support.':
        setError(error.message);
        break;
      default:
        setError('An error occurred during login');
    }
  } finally {
    setIsLoading(false);
  }
};


const handleSignup = async () => {
  setIsLoading(true);
  setError('');

  try {
    const now = new Date().toISOString();

    // Create auth account
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      newAdmin.email.trim(), 
      password
    );

    // Create Firestore document
    const userRef = doc(db, 'users', userCredential.user.uid);
    await setDoc(userRef, {
      name: newAdmin.name,
      email: newAdmin.email.trim(),
      phone: newAdmin.phone,
      role: newAdmin.role,
      status: newAdmin.status,
      updatedAt: now,
      lastLoginAt: now,
      createdAt: now
    });

    // Store admin data
    const adminData = {
      id: userCredential.user.uid,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      status: newAdmin.status
    };
    
    localStorage.setItem('adminUser', JSON.stringify(adminData));
    handleSignupModalClose();
    navigate('/Dashboard');

  } catch (error) {
    console.error('Signup error:', error);
    switch (error.code) {
      case 'auth/email-already-in-use':
        setError('This email is already registered');
        break;
      case 'auth/invalid-email':
        setError('Invalid email address');
        break;
      case 'auth/weak-password':
        setError('Password should be at least 6 characters');
        break;
      default:
        setError('Error creating account: ' + error.message);
    }
  } finally {
    setIsLoading(false);
  }
};



const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Now setLoading is defined
    setError(null);

    try {
    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user data in localStorage
    const adminData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Admin',
      accessToken: await user.getIdToken()
    };

    localStorage.setItem('adminUser', JSON.stringify(adminData));
    
    // Navigate to dashboard
    navigate('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    switch (error.code) {
      case 'auth/user-not-found':
        setError('No admin account found with this email');
        break;
      case 'auth/wrong-password':
        setError('Incorrect password');
        break;
      case 'auth/invalid-email':
        setError('Invalid email address');
        break;
      default:
        setError('Failed to login. Please try again.');
    }
  } finally {
    setLoading(false);
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

            <button 
              type="submit" 
              style={styles.button}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
      <Modal open={signupModal} onClose={handleSignupModalClose}>
      <Box sx={modalStyles.box}>
        <h2 style={modalStyles.title}>Create Admin Account</h2>
        
        {error && <p style={styles.error}>{error}</p>}
        
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={newAdmin.name}
          onChange={handleNewAdminChange}
          sx={modalStyles.field}
          required
        />
        
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={newAdmin.email}
          onChange={handleNewAdminChange}
          sx={modalStyles.field}
          required
        />

        <TextField
          fullWidth
          label="Phone"
          name="phone"
          type="tel"
          value={newAdmin.phone}
          onChange={handleNewAdminChange}
          sx={modalStyles.field}
          required
        />
        
        <FormControl fullWidth sx={modalStyles.field}>
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={newAdmin.role}
            onChange={handleNewAdminChange}
            label="Role"
            required
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Super Admin">Super Admin</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={modalStyles.field}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={newAdmin.status}
            onChange={handleNewAdminChange}
            label="Status"
            required
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
          </Select>
        </FormControl>

        <div style={modalStyles.buttons}>
          <button 
            onClick={handleSignupModalClose}
            style={modalStyles.cancelButton}
          >
            Cancel
          </button>
          <button
            onClick={handleSignup}
            style={modalStyles.signupButton}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Account'}
          </button>
        </div>
      </Box>
    </Modal>
    </div>
  );
}

const modalStyles = {
  field: {
    marginBottom: '16px',
    '& .MuiInputLabel-root': {
      color: '#0f5954',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#0f5954',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0f5954',
      },
    }
  },
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '24px',
    color: '#035b5b',
    marginBottom: '24px',
    textAlign: 'center',
  },
  field: {
    marginBottom: '16px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '24px',
  },
  cancelButton: {
    padding: '10px 20px',
    border: '1px solid #0f5954',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: '#0f5954',
    cursor: 'pointer',
  },
  signupButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#0f5954',
    color: '#fff',
    cursor: 'pointer',
  },
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
