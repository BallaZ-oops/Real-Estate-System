import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, hasRole } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.container}>
                <Link to="/" style={styles.brand}>
                    🏠 RealEstate
                </Link>
                <div style={styles.navLinks}>
                    <Link to="/properties" style={styles.link}>Объекты</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" style={styles.link}>Мои объекты</Link>
                            {hasRole('ADMIN') && (
                                <Link to="/admin" style={styles.link}>Админ панель</Link>
                            )}
                            <span style={styles.userInfo}>👋 {user.username}</span>
                            <button onClick={handleLogout} style={styles.logoutBtn}>
                                Выйти
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={styles.link}>Вход</Link>
                            <Link to="/register" style={styles.link}>Регистрация</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: '#2c3e50',
        padding: '1rem',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    brand: {
        color: 'white',
        fontSize: '1.5rem',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    navLinks: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        transition: 'background 0.3s',
    },
    userInfo: {
        color: '#3498db',
        marginRight: '0.5rem',
    },
    logoutBtn: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
};

export default Navbar;