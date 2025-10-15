import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>Iker Alejandro Harnisch Narvaez - Haciendo uso de The Simpsons API.</p>
      </footer>
    </div>
  );
};

export default Layout;