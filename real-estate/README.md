# 🏠 Real Estate System

# Rakhmanov Ertabyldy

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Java](https://img.shields.io/badge/Java-17-orange)
![React](https://img.shields.io/badge/React-18-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**Полноценная система управления недвижимостью с JWT аутентификацией и RBAC ролями**

[Демо](#) • [Документация](#) • [Сообщить о проблеме](https://github.com/yourusername/real-estate-system/issues)

</div>

---

## 📋 О проекте

Real Estate System - это веб-приложение для управления объектами недвижимости. Система позволяет пользователям регистрироваться, создавать объекты недвижимости, искать их по различным критериям и управлять своими объявлениями.

### 🎯 Особенности

- ✅ **JWT Аутентификация** - безопасный вход и регистрация
- ✅ **RBAC Роли** - пользователи, агенты, администраторы
- ✅ **CRUD операции** - создание, чтение, обновление, удаление объектов
- ✅ **Поиск и фильтрация** - по городу, цене, типу недвижимости
- ✅ **Личный кабинет** - управление своими объявлениями
- ✅ **Адаптивный дизайн** - работает на всех устройствах
- ✅ **Кыргызская локализация** - валюты (сом) и телефоны (+996)

---

## 🛠 Технологии

### Бэкенд
| Технология | Версия | Описание |
|------------|--------|----------|
| Java | 17 | Основной язык |
| Spark Framework | 2.9.4 | Веб-фреймворк |
| H2 Database | 2.2.224 | Встроенная БД |
| JWT | 0.11.5 | Аутентификация |
| BCrypt | 0.4 | Хеширование паролей |
| Jackson | 2.15.2 | JSON парсинг |

### Фронтенд
| Технология | Версия | Описание |
|------------|--------|----------|
| React | 18.2 | UI библиотека |
| Vite | 5.0 | Сборщик |
| React Router | 6.20 | Маршрутизация |
| Axios | 1.6 | HTTP клиент |
| React Hot Toast | 2.4 | Уведомления |

---

## 📁 Структура проекта

```
Real-Estate-System/

├── src/main/java/com/realestate/

│   ├── Main.java
│   ├── controller/

│   ├── service/

│   ├── repository/

│   ├── model/

│   ├── utils/

│   └── db/

├── frontend/

│   └── src/

└── pom.xml
```

---

## 🚀 Установка и запуск

### Требования
- Java 17 или выше
- Node.js 18 или выше

### 1. Клонирование репозитория

```bash
git clone https://github.com/BallaZ-oops/Real-Estate-System.git
cd Real-Estate-System
```

### 2. Запуск бэкенда

**Через IntelliJ IDEA:**
- Откройте проект в IntelliJ IDEA
- Запустите `Main.java`

**Через Maven:**
```bash
mvn clean compile exec:java -Dexec.mainClass=com.realestate.Main
```

Бэкенд запустится на `http://localhost:8080`

### 3. Запуск фронтенда

```bash
cd frontend
npm install
npm run dev
```

Фронтенд запустится на `http://localhost:5173`

---

## 📖 API Документация

### Аутентификация

| Метод | Endpoint | Описание |
|-------|----------|----------|
| POST | /api/auth/register | Регистрация |
| POST | /api/auth/login | Вход |

**Регистрация:**
```json
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "123456",
    "firstName": "Тест",
    "lastName": "Тестов",
    "phone": "+996700123456"
}
```

**Вход:**
```json
{
    "username": "testuser",
    "password": "123456"
}
```

**Ответ:**
```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "username": "testuser",
    "role": "USER"
}
```

### Объекты недвижимости

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | /api/properties/public | Все объекты |
| GET | /api/properties/public/{id} | Объект по ID |
| POST | /api/properties | Создать |
| GET | /api/properties/my | Мои объекты |
| DELETE | /api/properties/{id} | Удалить |
| GET | /api/properties/search | Поиск |

**Создание объекта:**
```json
{
    "title": "Квартира в центре",
    "description": "Современная квартира",
    "propertyType": "APARTMENT",
    "price": 5000000,
    "area": 65.5,
    "bedrooms": 2,
    "bathrooms": 1,
    "city": "Бишкек",
    "location": "Центр",
    "address": "ул. Чуй, 123"
}
```

### Типы недвижимости

| Значение | Описание |
|----------|----------|
| APARTMENT | Квартира |
| HOUSE | Дом |
| LAND | Участок |
| COMMERCIAL | Коммерческая |

### Поиск

```
GET /api/properties/search?city=Бишкек&minPrice=3000000&maxPrice=7000000&type=APARTMENT
```

---

## 👥 Роли пользователей

| Роль | Права |
|------|-------|
| USER | Просмотр объектов |
| AGENT | Создание и удаление своих объектов |
| ADMIN | Управление пользователями |

---

## 🐛 Решение проблем

**CORS ошибка:**
```bash
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:\chrome-temp"
```

**Порт 8080 занят:**
В `Main.java` измените `port(8081);`

**База данных не инициализируется:**
Удалите файл `~/realestate_db.mv.db` и перезапустите бэкенд

---


## 👨‍💻 Автор

**BallaZ-ooops**
GitHub: [@BallaZ-oops](https://github.com/BallaZ-oops)


