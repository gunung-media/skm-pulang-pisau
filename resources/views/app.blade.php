<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <title inertia>{{ config('app.name', 'FeedbackHub') }}</title>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">


    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx", 'resources/css/app.css'])
    @inertiaHead
</head>

<body class="antialiased">
    @inertia
</body>

</html>
