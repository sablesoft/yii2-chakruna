<?php
return [
    'adminEmail' => 'admin@chakruna.club',
    'supportEmail' => 'support@chakruna.club',
    'user.passwordResetTokenExpire' => 3600,
    // устанавливаются при разворачивании приложения после успешной установки системного пользователя:
    'systemLanguages' => [
        ['code' => 'en', 'name' => 'English', 'native_name' => 'English'],
        ['code' => 'ru', 'name' => 'Russian', 'native_name' => 'Русский']
    ],
    'settings' => require( __DIR__ . '/settings.php')
];
