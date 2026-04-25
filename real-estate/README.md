# 🏠 Real Estate System

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
real-estate-system/
├── backend/ # Бэкенд часть
│ ├── src/main/java/com/realestate/
│ │ ├── Main.java # Точка входа
│ │ ├── controller/ # Контроллеры (API)
│ │ ├── service/ # Бизнес-логика
│ │ ├── repository/ # Работа с БД
│ │ ├── model/ # Модели данных
│ │ ├── utils/ # Утилиты (JWT, хеширование)
│ │ └── db/ # Подключение к БД
│ └── pom.xml # Maven зависимости
│
├── frontend/ # Фронтенд часть
│ ├── src/
│ │ ├── components/ # React компоненты
│ │ ├── pages/ # Страницы
│ │ ├── context/ # Контекст аутентификации
│ │ ├── services/ # API сервисы
│ │ └── utils/ # Вспомогательные функции
│ └── package.json # NPM зависимости
│
└── README.md # Документация

---

## 🚀 Быстрый старт

### Требования

- **Java 17** или выше
- **Node.js 18** или выше
- **Maven** (или используйте встроенный в IDEA)

### Установка и запуск

#### 1. Клонируйте репозиторий

```bash
git clone https://github.com/yourusername/real-estate-system.git
cd real-estate-system2. Запустите бэкенд
Вариант A: Через IntelliJ IDEA

  Откройте проект в IntelliJ IDEA

  Запустите Main.java

Вариант B: Через Maven
cd backend
mvn clean compile exec:java -Dexec.mainClass=com.realestate.Main

Бэкенд запустится на http://localhost:8080

3. Запустите фронтенд
Фронтенд запустится на http://localhost:5173

4. Откройте приложение
Перейдите в браузере: http://localhost:5173

📖 API Документация

Аутентификация

Метод	Endpoint	Описание
POST	/api/auth/register	Регистрация пользователя
POST	/api/auth/login	Вход в систему

Пример регистрации:

cd frontend
npm install
npm run dev

{
    "username": "testuser",
    "email": "test@example.com",
    "password": "123456",
    "firstName": "Тест",
    "lastName": "Тестов",
    "phone": "+996700123456"
}

Пример входа:

{
    "username": "testuser",
    "password": "123456"
}

Ответ при успешном входе:

{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "username": "testuser",
    "role": "USER"
}

Объекты недвижимости
Метод	Endpoint	Описание
GET	/api/properties/public	Получить все объекты
GET	/api/properties/public/{id}	Получить объект по ID
POST	/api/properties	Создать объект (требуется токен)
GET	/api/properties/my	Мои объекты (требуется токен)
DELETE	/api/properties/{id}	Удалить объект (требуется токен)
GET	/api/properties/search	Поиск объектов
Пример создания объекта:
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
    "imageUrl": "https://example.com/photo.jpg",
    "available": true
}

Типы недвижимости
Значение	Описание
APARTMENT	Квартира
HOUSE	Дом
LAND	Земельный участок
COMMERCIAL	Коммерческая недвижимость
👥 Роли пользователей
Роль	Права
USER	Просмотр объектов, регистрация
AGENT	+ Создание/удаление своих объектов
ADMIN	+ Управление пользователями
🔧 Конфигурация
Бэкенд (Database.java)

// H2 Database (встроенная)
private static final String DB_URL = "jdbc:h2:~/realestate_db";
private static final String USER = "sa";
private static final String PASSWORD = "";

Фронтенд (api.js)
javascript
const API_BASE_URL = 'http://localhost:8080/api';

🐛 Возможные проблемы и решения
Проблема: CORS ошибка
Решение: Используйте браузер с отключенной безопасностью или настройте CORS в Main.java

Проблема: Порт 8080 занят
Решение: Измените порт в Main.java:

java
port(8081); // вместо 8080
Проблема: База данных не инициализируется
Решение: Удалите файл ~/realestate_db.mv.db и перезапустите бэкенд

📝 Лицензия
MIT License - свободное использование, копирование, модификация.

👨‍💻 Автор
Эртабылды

GitHub: BallaZ-oops

