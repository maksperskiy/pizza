# PizzaShop

#### _Индивидуальное задание по дисциплине:_
#### "Управление данными в информационно-измерительных системах"

###### Разработали: Ступакевич М.Р., Равлушевич Я.Ю.
#
#
## Структура приложения
- Back-end — ASP.Net C# Web API приложение
- Front-end — React.JS Redux приложение
- База данных — PostgreSQL

## Используемые технологии
- Docker
- Docker-compose
- React.JS
- React router DOM
- React content loader
- React toastify
- Redux
- Redux thunk
- Formik
- Axios
- Material UI
- ASP.Net
- Swagger
- LINQ
- EntityFramework
- PostgreSQL
- PgAdmin

## Установка и запуск
Системные требования приложения:
- Windows 10 и выше или Linux
- Средства виртуализации (Hyper-V и др.)
- Docker

Для запуска необходимо:
- Запустить докер
- Перейти в папку проекта
- Открыть терминал
- Ввести следующую строку
```sh
docker-compose up —build
```
Приложение использует порты:
- 3000 — для фронт-енда
- 8120 — для бэк-енда
- 15432 — для базы данных
- 15433 — для приложения дополнительного управления базой данных 