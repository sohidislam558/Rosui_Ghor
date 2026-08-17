<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

/*
|--------------------------------------------------------------------------
| Web Routes & React SPA Serving
|--------------------------------------------------------------------------
|
| Laravel serves the production-built React frontend directly from the
| public directory (index.html) for all non-API web routes.
|
*/

function serveReactSpa() {
    $indexPath = public_path('index.html');

    if (File::exists($indexPath)) {
        return response()->file($indexPath, [
            'Content-Type' => 'text/html; charset=UTF-8',
            'Cache-Control' => 'no-cache, private',
        ]);
    }

    return response(
        '<!DOCTYPE html><html><head><title>Rosui Ghor - Build Required</title></head>' .
        '<body style="font-family:sans-serif;padding:2rem;text-align:center;">' .
        '<h1>Rosui Ghor Frontend Build Not Found</h1>' .
        '<p>Please run <code>npm run build</code> in the project root to compile the frontend assets.</p>' .
        '</body></html>',
        503,
        ['Content-Type' => 'text/html; charset=UTF-8']
    );
}

// Root landing page
Route::get('/', function () {
    return serveReactSpa();
});

// Catch-all for all React Router client routes (excluding /api and /storage)
Route::get('/{any}', function () {
    return serveReactSpa();
})->where('any', '^(?!api|storage|assets).*$');

// Fallback for any other unhandled GET request that is not an API route
Route::fallback(function () {
    return serveReactSpa();
});
