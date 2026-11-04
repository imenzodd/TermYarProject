@echo off
chcp 65001 > nul
title TermYar Launcher - پرونده تحلیلی و برنامه ترم‌یار

echo ========================================================
echo   سامانه ترم‌یار (TermYar) - پرونده تحلیلی درس تجارت الکترونیک
echo ========================================================
echo.
echo در حال باز کردن خودکار در مرورگر پیش‌فرض شما...
echo.

if exist "پرونده_تحلیلی_ترمیار.html" (
    start "" "پرونده_تحلیلی_ترمیار.html"
    echo [موفق] پرونده تحلیلی باز شد!
    timeout /t 2 > nul
    exit /b
)

if exist "اجرای_مستقیم_ترم‌یار.html" (
    start "" "اجرای_مستقیم_ترم‌یار.html"
    echo [موفق] برنامه باز شد!
    timeout /t 2 > nul
    exit /b
)

if exist "TermYar.html" (
    start "" "TermYar.html"
    echo [موفق] برنامه باز شد!
    timeout /t 2 > nul
    exit /b
)

if exist "dist\index.html" (
    start "" "dist\index.html"
    echo [موفق] نسخه dist باز شد!
    timeout /t 2 > nul
    exit /b
)

echo در حال اجرای سرور محلی...
call npm run dev
