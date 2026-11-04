@echo off
chcp 65001 > nul
title TermYar Launcher

echo Opening TermYar Dossier & App in your browser...

if exist "پرونده_تحلیلی_ترمیار.html" (
    start "" "پرونده_تحلیلی_ترمیار.html"
    exit /b
)

if exist "اجرای_مستقیم_ترم‌یار.html" (
    start "" "اجرای_مستقیم_ترم‌یار.html"
    exit /b
)

if exist "TermYar.html" (
    start "" "TermYar.html"
    exit /b
)

if exist "dist\index.html" (
    start "" "dist\index.html"
    exit /b
)

call npm run dev
