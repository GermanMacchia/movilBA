@echo off
setlocal enabledelayedexpansion
set PORT=4200

echo ===============================
echo Iniciando servidor Angular...
echo ===============================
start "" /B cmd /c "ng serve --port=%PORT% --configuration development" >nul 2>&1
timeout /t 2 >nul

echo Esperando que Angular este disponible en http://localhost:%PORT%
:wait_for_server
curl http://localhost:%PORT% >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    timeout /t 1 >nul
    goto wait_for_server
)

echo ===============================
echo Ejecutando Cypress (modo headless)...
echo ===============================
call npx cypress run
set TEST_RESULT=%ERRORLEVEL%

goto cleanup

:cleanup
echo ===============================
echo Cerrando servidor Angular...
echo ===============================

powershell -NoProfile -Command " $p = (netstat -aon | Select-String ':4200' | Where-Object { $_ -match 'LISTENING' } | ForEach-Object { ($_ -split '\s+')[-1] } | Select-Object -First 1); if ($p) { Stop-Process -Id $p -Force; Write-Host 'Proceso cerrado correctamente.' } else { Write-Host 'Puerto ya libre.' }"

if %TEST_RESULT% NEQ 0 (
    echo Cypress falló con código %TEST_RESULT%
    exit /b %TEST_RESULT%
)

echo Cypress finalizado correctamente.
endlocal
exit /b 0
