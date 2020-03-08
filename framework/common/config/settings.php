<?php
return [
    'domain' => [
        'front' => "$scheme://$domain",
        'back'  => "$scheme://admin.$domain"
    ],
    'access' => [
        'skipController'    => ['site'],
        'skipModule'        => ['frontend', 'user', 'gii'],
        'pattern' => [
            'backend'   => "{controller}.{action}",
            'media'  => "{module}.{action}",
            'rbac'   => "{controller}.{action}",
            'gallery' => "{module}.{action}",
            'gii'    => "{module}"
        ]
    ]
];