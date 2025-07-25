# Pipedrive Iframe Integration

Форма создания задач для интеграции с Pipedrive CRM через iframe.

## Демо

Проект доступен на GitHub Pages: https://john3volta.github.io/pipedrive-iframe-integration/

## Функциональность

- Многосекционная форма с валидацией полей
- Интеграция с Pipedrive API для создания сделок, контактов и организаций
- Валидация данных на клиентской стороне
- Управление состоянием формы
- Адаптивный дизайн для iframe интеграции

## Технологии

- Vue.js 3 + Composition API
- TypeScript
- Axios (HTTP клиент)
- Vite (сборка)
- Sass (стили)

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Разработка
npm run dev

# Сборка для продакшена
npm run build
```

## Структура проекта

```
src/
├── components/     # Vue компоненты
├── services/       # API сервисы
├── types/          # TypeScript типы
├── data/           # Данные форм
├── styles/         # Стили
├── utils/          # Утилиты
└── main.ts         # Точка входа
``` 