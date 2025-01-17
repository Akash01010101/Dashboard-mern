
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadForm from './components/Uploadform';
import AdminDashboard from './components/AdminDashboard';
import AdminForm from './components/AdminForm';
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<UploadForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/adminform" element={<AdminForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
