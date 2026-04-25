# 🏠 Real Estate System

<div align="center">

![Java](https://img.shields.io/badge/Java-17-orange)
![React](https://img.shields.io/badge/React-18-blue)
![Spark](https://img.shields.io/badge/Spark-2.9.4-green)
![H2](https://img.shields.io/badge/H2-Database-yellow)
![JWT](https://img.shields.io/badge/JWT-Auth-red)
![License](https://img.shields.io/badge/License-MIT-blue)

**Полноценная система управления недвижимостью с JWT аутентификацией**

[Особенности](#-особенности) • [Технологии](#-технологии) • [Установка](#-установка) • [API](#-api-документация)

</div>

---

## 📋 О проекте

Real Estate System - это веб-приложение для управления объектами недвижимости. Позволяет пользователям регистрироваться, создавать объявления, искать недвижимость и управлять своими объектами.

### 🎯 Особенности

| Функция | Описание |
|---------|----------|
| 🔐 **JWT Аутентификация** | Безопасный вход и регистрация |
| 👥 **RBAC Роли** | USER, AGENT, ADMIN |
| 📝 **CRUD операции** | Создание, чтение, обновление, удаление |
| 🔍 **Поиск и фильтрация** | По городу, цене, типу недвижимости |
| 👤 **Личный кабинет** | Управление своими объявлениями |
| 📱 **Адаптивный дизайн** | Работает на всех устройствах |
| 💰 **Кыргызские сомы** | Локальная валюта |
| 📞 **+996 формат** | Местные номера телефонов |

---

## 🛠 Технологии

### Бэкенд
| Технология | Версия | Назначение |
|------------|--------|------------|
| Java | 17 | Основной язык |
| Spark Framework | 2.9.4 | Веб-фреймворк |
| H2 Database | 2.2.224 | Встроенная БД |
| JWT | 0.11.5 | Аутентификация |
| BCrypt | 0.4 | Хеширование паролей |
| Jackson | 2.15.2 | JSON парсинг |
| Maven | - | Сборка проекта |

### Фронтенд
| Технология | Версия | Назначение |
|------------|--------|------------|
| React | 18.2 | UI библиотека |
| Vite | 5.0 | Сборщик |
| React Router | 6.20 | Маршрутизация |
| Axios | 1.6 | HTTP клиент |
| React Hot Toast | 2.4 | Уведомления |

---

## 📁 Структура проекта
Real-Estate-System/
├── src/main/java/com/realestate/
│ ├── Main.java # Точка входа
│ ├── controller/ # REST контроллеры
│ │ ├── AuthController.java
│ │ └── PropertyController.java
│ ├── service/ # Бизнес-логика
│ │ ├── UserService.java
│ │ └── PropertyService.java
│ ├── repository/ # Работа с БД
│ │ ├── UserRepository.java
│ │ └── PropertyRepository.java
│ ├── model/ # Модели данных
│ │ ├── User.java
│ │ ├── Property.java
│ │ └── Role.java
│ ├── utils/ # Утилиты
│ │ ├── JwtUtils.java
│ │ └── PasswordUtils.java
│ └── db/ # Подключение к БД
│ └── Database.java
├── frontend/ # React приложение
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ └── services/
│ └── package.json
└── pom.xml


## 🚀 Установка и запуск

### Требования
- **Java 17** или выше
- **Node.js 18** или выше
- **Maven** (или встроенный в IDEA)

### 1. Клонирование репозитория

``bash
git clone https://github.com/BallaZ-oops/Real-Estate-System.git
cd Real-Estate-System

2. Запуск бэкенда
Вариант А: Через IntelliJ IDEA

--Откройте проект в IntelliJ IDEA

--Запустите Main.java

Вариант Б: Через Maven

mvn clean compile exec:java -Dexec.mainClass=com.realestate.Main

✅ Бэкенд запустится на http://localhost:8080

3. Запуск фронтенда
cd frontend
npm install
npm run dev

✅ Фронтенд запустится на http://localhost:5173

📖 API Документация
Аутентификация
Метод	Endpoint	Описание
POST	/api/auth/register	Регистрация
POST	/api/auth/login	Вход
Регистрация:

{
    "username": "testuser",
    "email": "test@example.com",
    "password": "123456",
    "firstName": "Тест",
    "lastName": "Тестов",
    "phone": "+996700123456"
}

Вход:
{
    "username": "testuser",
    "password": "123456"
}

Ответ при входе:
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "username": "testuser",
    "role": "USER"
}

Объекты недвижимости
Метод	Endpoint	Описание
GET	/api/properties/public	Все объекты
GET	/api/properties/public/{id}	Объект по ID
POST	/api/properties	Создать (требуется токен)
GET	/api/properties/my	Мои объекты
DELETE	/api/properties/{id}	Удалить
GET	/api/properties/search	Поиск

Создание объекта:
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
    "address": "ул. Чуй, 123",
    "imageUrl": "https://example.com/photo.jpg"
}

Типы недвижимости
Значение	Описание
APARTMENT	Квартира
HOUSE	Дом
LAND	Земельный участок
COMMERCIAL	Коммерческая

Поиск
GET /api/properties/search?city=Бишкек&minPrice=3000000&maxPrice=7000000&type=APARTMENT

👥 Роли пользователей
Роль	Права
USER	Просмотр объектов, регистрация
AGENT	+ Создание/удаление своих объектов
ADMIN	+ Управление пользователями

🐛 Решение проблем
CORS ошибка
Используйте браузер с отключенной безопасностью:
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:\chrome-temp"

Порт 8080 занят
Измените порт в Main.java:
port(8081); // вместо 8080

База данных не инициализируется
Удалите файл ~/realestate_db.mv.db и перезапустите бэкенд

📝 Лицензия
MIT License - свободное использование, копирование, модификация.

👨‍💻 Автор
BallaZ-ooops

GitHub: @BallaZ-ooops

