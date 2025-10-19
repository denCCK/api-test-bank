## api-test-bank - React + Vite

React-приложение с использованием TypeScript, Redux и Bootstrap для получения и фильтрации данных через публичное API JSONPlaceholder. 
Приложение можно запускать локально для разработки или через Docker с помощью docker-compose.

---

## Требования

- Node.js >= 20
- npm >= 9
- Docker >= 20

---

## Запуск

1. Клонируем репозиторий:

git clone https://github.com/denCCK/api-test-bank.git

cd api-test-bank

2. Устанавливаем зависимости:

npm install

3. Запускаем проект:

npm run dev

4. Локальный сервер Vite доступен по адресу:

http://localhost:5173

---

## Сборка

npm run build


## Запуск через Docker

1. Создаём Docker-образ и запускаем контейнер через docker-compose:

docker-compose up --build

2. Приложение будет доступно по адресу:

http://localhost:8080