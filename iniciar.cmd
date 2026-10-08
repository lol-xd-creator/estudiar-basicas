@echo off
rem Arranca el servidor (lee la configuración de .env si existe) y abre la app.
cd /d "%~dp0"
start "" http://localhost:8091
node --env-file-if-exists=.env server.js
