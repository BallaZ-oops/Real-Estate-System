import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { formatPrice } from '../utils/currency';

const Home = () => {
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedProperties();
    }, []);

    const fetchFeaturedProperties = async () => {
        try {
            const response = await api.get('/properties/public');
            setFeaturedProperties(response.data.slice(0, 3));
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <header style={styles.hero}>
                <div style={styles.container}>
                    <h1 style={styles.title}>Найдите идеальную недвижимость</h1>
                    <p style={styles.subtitle}>
                        Квартиры, дома, коммерческая недвижимость - лучшие предложения на рынке
                    </p>
                    <Link to="/properties" style={styles.ctaButton}>
                        Смотреть объекты
                    </Link>
                </div>
            </header>

            <section style={styles.features}>
                <div style={styles.container}>
                    <h2 style={styles.sectionTitle}>Почему выбирают нас</h2>
                    <div style={styles.featuresGrid}>
                        <div style={styles.featureCard}>
                            <div style={styles.featureIcon}>✅</div>
                            <h3>Проверенные объекты</h3>
                            <p>Все объекты проходят тщательную проверку</p>
                        </div>
                        <div style={styles.featureCard}>
                            <div style={styles.featureIcon}>🤝</div>
                            <h3>Прямые собственники</h3>
                            <p>Работаем напрямую с владельцами</p>
                        </div>
                        <div style={styles.featureCard}>
                            <div style={styles.featureIcon}>📈</div>
                            <h3>Лучшие цены</h3>
                            <p>Конкурентные цены на рынке</p>
                        </div>
                    </div>
                </div>
            </section>

            {!loading && featuredProperties.length > 0 && (
                <section style={styles.featured}>
                    <div style={styles.container}>
                        <h2 style={styles.sectionTitle}>Популярные объекты</h2>
                        <div style={styles.propertiesGrid}>
                            {featuredProperties.map(property => (
                                <div key={property.id} style={styles.propertyCard}>
                                    <img 
                                        src={property.imageUrl || 'https://via.placeholder.com/400x250'} 
                                        alt={property.title}
                                        style={styles.propertyImage}
                                    />
                                    <div style={styles.propertyInfo}>
                                        <h3>{property.title}</h3>
                                        <p style={styles.price}>{formatPrice(property.price)}</p>
                                        <p>{property.city}, {property.location}</p>
                                        <p>{property.bedrooms} комн. | {property.area} м²</p>
                                        <Link 
                                            to={`/properties/${property.id}`} 
                                            style={styles.detailsBtn}
                                        >
                                            Подробнее
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

const styles = {
    hero: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '120px 0 80px',
        textAlign: 'center',
        marginTop: '60px',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
    },
    title: {
        fontSize: '3rem',
        marginBottom: '1rem',
    },
    subtitle: {
        fontSize: '1.2rem',
        marginBottom: '2rem',
        opacity: 0.9,
    },
    ctaButton: {
        display: 'inline-block',
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '12px 30px',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '1.1rem',
    },
    features: {
        padding: '60px 0',
        backgroundColor: '#f9f9f9',
    },
    sectionTitle: {
        textAlign: 'center',
        marginBottom: '40px',
        fontSize: '2rem',
        color: '#333',
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
    },
    featureCard: {
        textAlign: 'center',
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    featureIcon: {
        fontSize: '3rem',
        marginBottom: '20px',
    },
    featured: {
        padding: '60px 0',
    },
    propertiesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '30px',
        marginTop: '30px',
    },
    propertyCard: {
        backgroundColor: 'white',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    propertyImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    },
    propertyInfo: {
        padding: '20px',
    },
    price: {
        fontSize: '1.5rem',
        color: '#e74c3c',
        fontWeight: 'bold',
        margin: '10px 0',
    },
    detailsBtn: {
        display: 'inline-block',
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#3498db',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        textAlign: 'center',
    },
};

export default Home;