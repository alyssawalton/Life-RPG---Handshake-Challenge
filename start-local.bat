@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js is required. Install Node.js 18+ and run this file again.
  pause
  exit /b 1
)
if not exist node_modules\ws (
  echo Installing the multiplayer server dependency...
  call npm install
  if errorlevel 1 (
    echo npm install failed.
    pause
    exit /b 1
  )
)
start "Life RPG" cmd /c "timeout /t 1 /nobreak >nul & start http://localhost:3000/"
echo Starting Life RPG multiplayer server at http://localhost:3000
node server.js
pause
