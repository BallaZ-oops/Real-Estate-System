import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { formatPrice } from '../utils/currency';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        city: '',
        minPrice: '',
        maxPrice: '',
        type: '',
    });

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await api.get('/properties/public');
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.city) params.append('city', filters.city);
            if (filters.minPrice) params.append('minPrice', filters.minPrice);
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
            if (filters.type) params.append('type', filters.type);
            
            const response = await api.get(`/properties/search?${params.toString()}`);
            setProperties(response.data);
        } catch (error) {
            console.error('Error searching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const resetFilters = () => {
        setFilters({
            city: '',
            minPrice: '',
            maxPrice: '',
            type: '',
        });
        fetchProperties();
    };

    const propertyTypes = [
        { value: 'APARTMENT', label: 'Квартира' },
        { value: 'HOUSE', label: 'Дом' },
        { value: 'LAND', label: 'Участок' },
        { value: 'COMMERCIAL', label: 'Коммерческая' },
    ];

    return (
        <div style={styles.container}>
            <h1 style={styles.pageTitle}>Объекты недвижимости</h1>
            
            <div style={styles.filters}>
                <div style={styles.filtersGrid}>
                    <input
                        type="text"
                        name="city"
                        placeholder="Город"
                        value={filters.city}
                        onChange={handleFilterChange}
                        style={styles.filterInput}
                    />
                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                        style={styles.filterSelect}
                    >
                        <option value="">Все типы</option>
                        {propertyTypes.map(type => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        name="minPrice"
                        placeholder="Цена от (сом)"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        style={styles.filterInput}
                    />
                    <input
                        type="number"
                        name="maxPrice"
                        placeholder="Цена до (сом)"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        style={styles.filterInput}
                    />
                </div>
                <div style={styles.filterButtons}>
                    <button onClick={handleSearch} style={styles.searchBtn}>
                        Поиск
                    </button>
                    <button onClick={resetFilters} style={styles.resetBtn}>
                        Сбросить
                    </button>
                </div>
            </div>

            {loading ? (
                <div style={styles.loading}>Загрузка...</div>
            ) : properties.length === 0 ? (
                <div style={styles.noResults}>Объектов не найдено</div>
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
    pageTitle: {
        textAlign: 'center',
        marginBottom: '30px',
        color: '#333',
    },
    filters: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '30px',
    },
    filtersGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '15px',
    },
    filterInput: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '14px',
    },
    filterSelect: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '14px',
        backgroundColor: 'white',
    },
    filterButtons: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
    },
    searchBtn: {
        padding: '10px 30px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    resetBtn: {
        padding: '10px 30px',
        backgroundColor: '#95a5a6',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
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
    detailsBtn: {
        display: 'inline-block',
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#3498db',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        textAlign: 'center',
        width: '100%',
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '1.2rem',
        color: '#666',
    },
    noResults: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '1.2rem',
        color: '#999',
    },
};

export default Properties;