@echo off
setlocal

set PORT=4200

echo ===============================
echo Iniciando Cypress en nueva ventana CMD...
echo ===============================
start "Cypress" cmd /k "npx cypress open"

echo ===============================
echo Iniciando Angular en esta consola...
echo (Ctrl+C para detener Angular manualmente)
echo ===============================
ng serve --port=%PORT% --configuration development

endlocal
exit /b 0
