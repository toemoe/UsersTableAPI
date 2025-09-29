# UserApp – Тестовое задание

Проект представляет собой приложение на **React + Node.js** для управления пользователями и группами. Включает фронтенд, бэкенд и базу данных PostgreSQL.

Ниже — пошаговые инструкции по развёртыванию.

---

## 1. Установка и настройка базы данных

1. Установите **PostgreSQL** и убедитесь, что сервис запущен.
2. Создайте новую базу данных:

<pre class="overflow-visible!" data-start="624" data-end="655"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>createdb userapp_db
</span></span></code></div></div></pre>

3. Выполните миграции или импортируйте схему таблиц:

<pre class="overflow-visible!" data-start="711" data-end="766"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>psql -d userapp_db -f backend/db/schema.sql
</span></span></code></div></div></pre>

4. Измените `.env` файл в папке `backend` с переменными для корректного подключения к базе:

<pre class="overflow-visible!" data-start="849" data-end="949"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>DB_USER</span><span>=postgres
</span><span>DB_PASSWORD</span><span>=password
</span><span>DB_HOST</span><span>=localhost
</span><span>DB_PORT</span><span>=</span><span>5432</span><span>
</span><span>PORT</span><span>=</span><span>3000</span><span>
</span><span>DB_NAME</span><span>=userapp_db
</span></span></code></div></div></pre>

---

## 2. Установка зависимостей

В корневой директории проекта выполните:

<pre class="overflow-visible!" data-start="1028" data-end="1051"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>npm install
</span></span></code></div></div></pre>

---

## 3. Создание бэкапа базы

Чтобы сохранить текущее состояние базы:

<pre class="overflow-visible!" data-start="1441" data-end="1472"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>node seed/backup.js
</span></span></code></div></div></pre>

* Бэкап создастся в `seed/backups/data_backup.json`.

---

## 4. Восстановление базы из бэкапа

Если нужно восстановить данные из бэкапа:

<pre class="overflow-visible!" data-start="1653" data-end="1685"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>node seed/restore.js
</span></span></code></div></div></pre>

---

## 5. Запуск бэкенда

Перейдите в папку `backend`:

<pre class="overflow-visible!" data-start="1813" data-end="1847"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>cd</span><span> backend
npm run dev
</span></span></code></div></div></pre>

---

## 6. Запуск фронтенда

Перейдите в папку `frontend`:

<pre class="overflow-visible!" data-start="1973" data-end="2008"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>cd</span><span> frontend
npm run dev
</span></span></code></div></div></pre>

---

## 7. Проверка работы приложения

1. Перейдите на страницу `/users` — вы увидите таблицу со списком пользователей.
2. Доступны операции: просмотр подробной информации о пользователе при нажатии, добавление по кнопке в хедере, редактирование и удаление информации на странице пользователя, а также сортировка по имени и группе.
3. Все изменения сохраняются в базе данных.

## 8. Итог

В ходе выполнения проекта были использованы вспомогательные инструменты:

* Информация с курса fullstackopen для создания backend'a, разделение логики в нем.
* AI для генерации стилей таблиц, карточек, модальных окон приложения
