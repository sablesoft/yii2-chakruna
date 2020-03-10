<?php

return [
    'media' => [
        'class' => 'noam148\imagemanager\Module',
        //set accces rules ()
        'canUploadImage' => true,
        'canRemoveImage' => function() {
            return true;
        },
        'user' => [
            // following line will restrict access to profile, recovery, registration and settings controllers from backend
            'as backend' => [
                'class' => 'dektrium\user\filters\BackendFilter',
                'controllers' => ['profile', 'recovery', 'registration', 'settings']
            ],
        ],
        'deleteOriginalAfterEdit' => false, // false: keep original image after edit. true: delete original image after edit
        // Set if blameable behavior is used, if it is, callable function can also be used
        'setBlameableBehavior' => false,
        //add css files (to use in media manage selector iframe)
        'cssFiles' => [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css',
        ]
    ]
];
