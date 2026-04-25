import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import { formatPrice } from '../utils/currency';

const Dashboard = () => {
    const { user } = useAuth();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newProperty, setNewProperty] = useState({
        title: '',
        description: '',
        propertyType: 'APARTMENT',
        price: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        city: '',
        location: '',
        address: '',
        imageUrl: '',
    });

    useEffect(() => {
        fetchMyProperties();
    }, []);

    const fetchMyProperties = async () => {
        try {
            const response = await api.get('/properties/my');
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProperty = async (e) => {
        e.preventDefault();
        try {
            const propertyData = {
                ...newProperty,
                price: parseFloat(newProperty.price),
                area: parseFloat(newProperty.area),
                bedrooms: parseInt(newProperty.bedrooms),
                bathrooms: parseInt(newProperty.bathrooms),
                available: true,
            };
            await api.post('/properties', propertyData);
            toast.success('Объект успешно создан!');
            setShowForm(false);
            fetchMyProperties();
            setNewProperty({
                title: '',
                description: '',
                propertyType: 'APARTMENT',
                price: '',
                area: '',
                bedrooms: '',
                bathrooms: '',
                city: '',
                location: '',
                address: '',
                imageUrl: '',
            });
        } catch (error) {
            toast.error('Ошибка при создании объекта');
        }
    };

    const handleDeleteProperty = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот объект?')) {
            try {
                await api.delete(`/properties/${id}`);
                toast.success('Объект удален');
                fetchMyProperties();
            } catch (error) {
                toast.error('Ошибка при удалении');
            }
        }
    };

    const handleInputChange = (e) => {
        setNewProperty({
            ...newProperty,
            [e.target.name]: e.target.value,
        });
    };

    const propertyTypes = [
        { value: 'APARTMENT', label: 'Квартира' },
        { value: 'HOUSE', label: 'Дом' },
        { value: 'LAND', label: 'Участок' },
        { value: 'COMMERCIAL', label: 'Коммерческая' },
    ];

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1>Мои объекты</h1>
                <button onClick={() => setShowForm(!showForm)} style={styles.addButton}>
                    {showForm ? 'Отмена' : '+ Добавить объект'}
                </button>
            </div>

            {showForm && (
                <div style={styles.formContainer}>
                    <h2 style={styles.formTitle}>Новый объект недвижимости</h2>
                    <form onSubmit={handleCreateProperty}>
                        <div style={styles.formGrid}>
                            <div style={styles.formGroup}>
                                <label>Название *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newProperty.title}
                                    onChange={handleInputChange}
                                    required
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Тип *</label>
                                <select
                                    name="propertyType"
                                    value={newProperty.propertyType}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                >
                                    {propertyTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div style={styles.formGroup}>
                                <label>Город *</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={newProperty.city}
                                    onChange={handleInputChange}
                                    required
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Район/локация</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={newProperty.location}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Адрес</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={newProperty.address}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Цена (сом) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={newProperty.price}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Цена"
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Площадь (м²)</label>
                                <input
                                    type="number"
                                    name="area"
                                    value={newProperty.area}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Кол-во комнат</label>
                                <input
                                    type="number"
                                    name="bedrooms"
                                    value={newProperty.bedrooms}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Кол-во санузлов</label>
                                <input
                                    type="number"
                                    name="bathrooms"
                                    value={newProperty.bathrooms}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label>URL изображения</label>
                                <input
                                    type="text"
                                    name="imageUrl"
                                    value={newProperty.imageUrl}
                                    onChange={handleInputChange}
                                    placeholder="https://..."
                                    style={styles.input}
                                />
                            </div>
                        </div>
                        <div style={styles.formGroup}>
                            <label>Описание</label>
                            <textarea
                                name="description"
                                value={newProperty.description}
                                onChange={handleInputChange}
                                rows="4"
                                style={styles.textarea}
                            />
                        </div>
                        <button type="submit" style={styles.submitButton}>
                            Создать объект
                        </button>
                    </form>
                </div>
            )}

            {loading ? (
                <div style={styles.loading}>Загрузка...</div>
            ) : properties.length === 0 ? (
                <div style={styles.noProperties}>
                    <p>У вас пока нет объектов недвижимости</p>
                    <button onClick={() => setShowForm(true)} style={styles.createFirstBtn}>
                        Создать первый объект
                    </button>
                </div>
            ) : (
                <div style={styles.propertiesGrid}>
                    {properties.map(property => (
                        <div key={property.id} style={styles.propertyCard}>
                            <img 
                                src={property.imageUrl || 'https://via.placeholder.com/400x250'} 
                                alt={property.title}
                                style={styles.propertyImage}
                            />
                            <div style={styles.propertyInfo}>
                                <h3>{property.title}</h3>
                                <p style={styles.price}>{formatPrice(property.price)}</p>
                                <p>🏠 {property.city}</p>
                                <p>🛏 {property.bedrooms} комн. | 📐 {property.area} м²</p>
                                <div style={styles.propertyButtons}>
                                    <Link 
                                        to={`/properties/${property.id}`} 
                                        style={styles.viewBtn}
                                    >
                                        Просмотр
                                    </Link>
                                    <button 
                                        onClick={() => handleDeleteProperty(property.id)} 
                                        style={styles.deleteBtn}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '80px auto 0',
        padding: '20px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
    },
    addButton: {
        backgroundColor: '#2ecc71',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    formContainer: {
        backgroundColor: '#f9f9f9',
        padding: '30px',
        borderRadius: '10px',
        marginBottom: '30px',
    },
    formTitle: {
        marginBottom: '20px',
        color: '#333',
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '15px',
        marginBottom: '15px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '14px',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '14px',
        fontFamily: 'inherit',
    },
    submitButton: {
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        padding: '12px 30px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        width: '100%',
    },
    propertiesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '30px',
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
        fontSize: '1.3rem',
        color: '#e74c3c',
        fontWeight: 'bold',
        margin: '10px 0',
    },
    propertyButtons: {
        display: 'flex',
        gap: '10px',
        marginTop: '15px',
    },
    viewBtn: {
        flex: 1,
        padding: '8px',
        backgroundColor: '#3498db',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        textAlign: 'center',
    },
    deleteBtn: {
        flex: 1,
        padding: '8px',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '1.2rem',
        color: '#666',
    },
    noProperties: {
        textAlign: 'center',
        padding: '60px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
    },
    createFirstBtn: {
        marginTop: '15px',
        padding: '10px 20px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Dashboard;