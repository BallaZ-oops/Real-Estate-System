import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { formatPrice } from '../utils/currency';

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, hasRole } = useAuth();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProperty();
    }, [id]);

    const fetchProperty = async () => {
        try {
            const response = await api.get(`/properties/public/${id}`);
            setProperty(response.data);
        } catch (error) {
            console.error('Error fetching property:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Вы уверены, что хотите удалить этот объект?')) {
            try {
                await api.delete(`/properties/${id}`);
                alert('Объект удален');
                navigate('/dashboard');
            } catch (error) {
                alert('Ошибка при удалении');
            }
        }
    };

    if (loading) {
        return <div style={styles.loading}>Загрузка...</div>;
    }

    if (!property) {
        return <div style={styles.error}>Объект не найден</div>;
    }

    const propertyTypeLabels = {
        APARTMENT: 'Квартира',
        HOUSE: 'Дом',
        LAND: 'Участок',
        COMMERCIAL: 'Коммерческая',
    };

    const isOwner = user && property.agentId === user.id;

    return (
        <div style={styles.container}>
            <div style={styles.propertyDetails}>
                <img 
                    src={property.imageUrl || 'https://via.placeholder.com/800x400'} 
                    alt={property.title}
                    style={styles.mainImage}
                />
                
                <div style={styles.content}>
                    <h1 style={styles.title}>{property.title}</h1>
                    
                    <div style={styles.infoGrid}>
                        <div style={styles.infoItem}>
                            <strong>💰 Цена:</strong>
                            <span>{formatPrice(property.price)}</span>
                        </div>
                        <div style={styles.infoItem}>
                            <strong>🏠 Тип:</strong>
                            <span>{propertyTypeLabels[property.propertyType] || property.propertyType}</span>
                        </div>
                        <div style={styles.infoItem}>
                            <strong>📍 Город:</strong>
                            <span>{property.city}</span>
                        </div>
                        <div style={styles.infoItem}>
                            <strong>📐 Площадь:</strong>
                            <span>{property.area} м²</span>
                        </div>
                        <div style={styles.infoItem}>
                            <strong>🛏 Комнаты:</strong>
                            <span>{property.bedrooms}</span>
                        </div>
                        <div style={styles.infoItem}>
                            <strong>🚽 Санузлы:</strong>
                            <span>{property.bathrooms}</span>
                        </div>
                        <div style={styles.infoItem}>
                            <strong>📍 Адрес:</strong>
                            <span>{property.address}</span>
                        </div>
                        <div style={styles.infoItem}>
                            <strong>📅 Добавлено:</strong>
                            <span>{new Date(property.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                    
                    <div style={styles.description}>
                        <h3>Описание</h3>
                        <p>{property.description || 'Нет описания'}</p>
                    </div>
                    
                    {(isOwner || hasRole('ADMIN')) && (
                        <div style={styles.actions}>
                            <button onClick={handleDelete} style={styles.deleteBtn}>
                                Удалить объект
                            </button>
                        </div>
                    )}
                    
                    <button onClick={() => navigate(-1)} style={styles.backBtn}>
                        ← Назад
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '80px auto 0',
        padding: '20px',
    },
    propertyDetails: {
        backgroundColor: 'white',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    mainImage: {
        width: '100%',
        height: '400px',
        objectFit: 'cover',
    },
    content: {
        padding: '30px',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#333',
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '15px',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
    },
    infoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 0',
        borderBottom: '1px solid #eee',
    },
    description: {
        marginBottom: '30px',
    },
    actions: {
        marginBottom: '20px',
    },
    deleteBtn: {
        padding: '10px 20px',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    backBtn: {
        padding: '10px 20px',
        backgroundColor: '#95a5a6',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '1.2rem',
        marginTop: '80px',
    },
    error: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '1.2rem',
        color: '#e74c3c',
        marginTop: '80px',
    },
};

export default PropertyDetails;