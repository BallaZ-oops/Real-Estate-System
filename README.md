
```markdown
Автор:
Rakhmanov Ertabyldy
```

<img width="1919" height="890" alt="Снимок экрана 2026-04-25 220253" src="https://github.com/user-attachments/assets/218869e4-536c-4fc9-8dbb-89f62ba973b2" />
<img width="1919" height="847" alt="Снимок экрана 2026-04-25 220306" src="https://github.com/user-attachments/assets/49190e23-5258-425e-bfd8-6764e79b0632" />
<img width="1919" height="921" alt="Снимок экрана 2026-04-25 221349" src="https://github.com/user-attachments/assets/e071aa98-343d-4041-99cc-5d94ec38b379" />
<img width="1919" height="929" alt="Снимок экрана 2026-04-25 221338" src="https://github.com/user-attachments/assets/2b30a166-0902-4c98-8244-52d3a346de1d" />
<img width="1919" height="929" alt="Снимок экрана 2026-04-25 220939" src="https://github.com/user-attachments/assets/98c44dad-9451-420b-b772-9b137d3da82c" />



```markdown
# 🏠 Real Estate System


## 📋 О проекте

Real Estate System - веб-приложение для управления объектами недвижимости.
Позволяет пользователям регистрироваться, создавать объявления, искать недвижимость и управлять своими объектами.

### 🎯 Особенности

- 🔐 **JWT Аутентификация** - безопасный вход и регистрация
- 👥 **RBAC Роли** - USER, AGENT, ADMIN
- 📝 **CRUD операции** - создание, чтение, обновление, удаление
- 🔍 **Поиск и фильтрация** - по городу, цене, типу
- 👤 **Личный кабинет** - управление своими объявлениями
- 💰 **Кыргызские сомы** - локальная валюта
- 📞 **+996 формат** - местные номера телефонов

---

## 🛠 Технологии

| Технология | Версия |
|------------|--------|
| Java | 17 |
| Spark Framework | 2.9.4 |
| H2 Database | 2.2.224 |
| JWT | 0.11.5 |
| React | 18.2 |
| Vite | 5.0 |

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

