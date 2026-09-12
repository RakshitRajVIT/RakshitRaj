import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Plus, Trash2, Edit2, Loader } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AdminDashboard = ({ darkMode }) => {
  const navigate = useNavigate();
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    link: '',
    image: '',
    category: 'web',
  });

  const colors = darkMode 
    ? { bg: 'bg-gray-900', text: 'text-white', card: 'bg-gray-800', input: 'bg-gray-700 text-white border-gray-600', label: 'text-gray-300' }
    : { bg: 'bg-gray-50', text: 'text-gray-900', card: 'bg-white', input: 'bg-white text-gray-900 border-gray-300', label: 'text-gray-700' };

  // Fetch projects from Firestore
  const fetchProjects = async () => {
    try {
      const projectsRef = collection(db, 'projects');
      const q = query(projectsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const projectsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsList);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!formData.title || !formData.description) {
        setError('Title and description are required');
        setLoading(false);
        return;
      }

      if (editingId) {
        // Update existing project
        const projectRef = doc(db, 'projects', editingId);
        await updateDoc(projectRef, {
          ...formData,
          technologies: formData.technologies.split(',').map(t => t.trim()),
          updatedAt: new Date(),
        });
        setSuccess('Project updated successfully!');
        setEditingId(null);
      } else {
        // Add new project
        await addDoc(collection(db, 'projects'), {
          ...formData,
          technologies: formData.technologies.split(',').map(t => t.trim()),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        setSuccess('Project added successfully!');
      }

      // Reset form and refresh projects
      setFormData({
        title: '',
        description: '',
        technologies: '',
        link: '',
        image: '',
        category: 'web',
      });
      setShowForm(false);
      await fetchProjects();
    } catch (err) {
      setError(err.message || 'Failed to save project');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteDoc(doc(db, 'projects', id));
      setSuccess('Project deleted successfully!');
      await fetchProjects();
    } catch (err) {
      setError('Failed to delete project');
      console.error('Error:', err);
    }
  };

  const handleEditProject = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies?.join(', ') || '',
      link: project.link || '',
      image: project.image || '',
      category: project.category || 'web',
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      navigate('/admin');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className={`min-h-screen ${colors.bg} p-4 md:p-8 transition-colors duration-300`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className={`text-4xl font-bold ${colors.text}`}>Dashboard</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
              Welcome, {adminUser.name || 'Admin'}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </motion.button>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-500"
          >
            {success}
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500"
          >
            {error}
          </motion.div>
        )}

        {/* Add Project Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditingId(null);
              setFormData({
                title: '',
                description: '',
                technologies: '',
                link: '',
                image: '',
                category: 'web',
              });
            }
          }}
          className="mb-6 flex items-center gap-2 px-6 py-2 bg-linear-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Add New Project'}
        </motion.button>

        {/* Add/Edit Project Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${colors.card} p-6 rounded-xl shadow-lg mb-8 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <h2 className={`text-2xl font-bold ${colors.text} mb-4`}>
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h2>
            <form onSubmit={handleAddProject} className="space-y-4">
              {/* Title */}
              <div>
                <label className={`block text-sm font-medium ${colors.label} mb-1`}>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Project title"
                  className={`w-full px-4 py-2 rounded-lg border ${colors.input} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                />
              </div>

              {/* Description */}
              <div>
                <label className={`block text-sm font-medium ${colors.label} mb-1`}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Project description"
                  rows="4"
                  className={`w-full px-4 py-2 rounded-lg border ${colors.input} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                />
              </div>

              {/* Technologies */}
              <div>
                <label className={`block text-sm font-medium ${colors.label} mb-1`}>Technologies (comma separated)</label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleInputChange}
                  placeholder="React, Firebase, Tailwind CSS"
                  className={`w-full px-4 py-2 rounded-lg border ${colors.input} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                />
              </div>

              {/* Link */}
              <div>
                <label className={`block text-sm font-medium ${colors.label} mb-1`}>Project Link</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className={`w-full px-4 py-2 rounded-lg border ${colors.input} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                />
              </div>

              {/* Image URL */}
              <div>
                <label className={`block text-sm font-medium ${colors.label} mb-1`}>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className={`w-full px-4 py-2 rounded-lg border ${colors.input} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                />
              </div>

              {/* Category */}
              <div>
                <label className={`block text-sm font-medium ${colors.label} mb-1`}>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${colors.input} focus:outline-none focus:ring-2 focus:ring-orange-500`}
                >
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile App</option>
                  <option value="design">Design</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 rounded-lg font-semibold text-white bg-linear-to-r from-orange-500 to-pink-500 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  editingId ? 'Update Project' : 'Add Project'
                )}
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Projects List */}
        <div>
          <h2 className={`text-2xl font-bold ${colors.text} mb-4`}>Projects ({projects.length})</h2>
          {projects.length === 0 ? (
            <div className={`${colors.card} p-8 rounded-xl text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <p>No projects yet. Create your first project!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${colors.card} p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
                >
                  {project.image && (
                    <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                  )}
                  <h3 className={`text-xl font-semibold ${colors.text} mb-2`}>{project.title}</h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-3 line-clamp-2`}>
                    {project.description}
                  </p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map(tech => (
                        <span key={tech} className="text-xs px-2 py-1 bg-orange-500/20 text-orange-500 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditProject(project)}
                      className="flex-1 py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      <Edit2 className="w-4 h-4" /> Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteProject(project.id)}
                      className="flex-1 py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
