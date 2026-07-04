<?php
return [
    'paths'                    => ['api/*'],
    'allowed_methods'          => ['*'],
    'allowed_origins'          => ['http://localhost', 'http://localhost:80', 'https://ejtecnologia.com.br', 'https://www.ejtecnologia.com.br'],
    'allowed_origins_patterns' => [],
    'allowed_headers'          => ['*'],
    'exposed_headers'          => [],
    'max_age'                  => 3600,
    'supports_credentials'     => false,
];
