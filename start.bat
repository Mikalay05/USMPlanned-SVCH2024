@echo off

:: Запуск сервера
start cmd /k "cd /d server && npm run dev"

:: Запуск клиента
start cmd /k "cd /d client && npm start"

pause
