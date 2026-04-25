export const formatPrice = (price) => {
    if (!price) return '0 сом';
    return price.toLocaleString('ru-RU') + ' сом';
};

export const formatPhone = (phone) => {
    if (!phone) return '';
    return phone;
};