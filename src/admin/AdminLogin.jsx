import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Chrome } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';

const AdminLogin = ({ darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const colors = darkMode 
    ? { 
        bg: 'bg-gray-900', 
        input: 'bg-gray-800 text-white border-gray-700',
        text: 'text-white',
        placeholder: 'placeholder-gray-500',
        label: 'text-gray-300',
        button: 'bg-gradient-to-r from-orange-500 to-pink-500',
        border: 'border-gray-700'
      }
    : { 
        bg: 'bg-gray-50', 
        input: 'bg-white text-gray-900 border-gray-300',
        text: 'text-gray-900',
        placeholder: 'placeholder-gray-400',
        label: 'text-gray-700',
        button: 'bg-gradient-to-r from-blue-500 to-purple-500',
        border: 'border-gray-300'
      };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user info in localStorage
      localStorage.setItem('adminToken', await user.getIdToken());
      localStorage.setItem('adminUser', JSON.stringify({
        id: user.uid,
        name: user.displayName || email.split('@')[0],
        email: user.email,
      }));

      navigate('/admin/dashboard');
    } catch (err) {
      // Firebase error messages
      if (err.code === 'auth/user-not-found') {
        setError('User account not found');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed login attempts. Try again later.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async () => {
    setLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Store user info in localStorage
      localStorage.setItem('adminToken', await user.getIdToken());
      localStorage.setItem('adminUser', JSON.stringify({
        id: user.uid,
        name: user.displayName || 'Admin',
        email: user.email,
      }));

      navigate('/admin/dashboard');
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled');
      } else {
        setError('Google login failed. Please try again.');
      }
      console.error('Google login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${colors.bg} transition-colors duration-300`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${colors.border}`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-3xl font-bold ${colors.text} mb-2`}
          >
            Admin Panel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`${colors.label}`}
          >
            Sign in to your admin account
          </motion.p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Password Login Form */}
        <form onSubmit={handlePasswordLogin} className="space-y-4 mb-6">
          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className={`block text-sm font-medium ${colors.label} mb-2`}>
              Email Address
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-3 w-5 h-5 ${colors.placeholder}`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${colors.input} focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                disabled={loading}
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <label className={`block text-sm font-medium ${colors.label} mb-2`}>
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-3 w-5 h-5 ${colors.placeholder}`} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${colors.input} focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
                disabled={loading}
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg font-semibold text-white ${colors.button} flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`flex-1 h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          <span className={colors.label}>OR</span>
          <div className={`flex-1 h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
        </div>

        {/* Google Login */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSuccess}
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg font-semibold text-white ${colors.button} flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Chrome className="w-5 h-5" />
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className={`text-center text-sm ${colors.label} mt-6`}
        >
          Secured Admin Access Only
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
