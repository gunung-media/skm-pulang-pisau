<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="description"
        content="Kami mendengarkan setiap masukan dengan seksama, memahami kebutuhan Anda, dan berkomitmen untuk terus meningkatkan kualitas layanan demi kepuasan Anda.">
    <meta name="keywords"
        content="IKM, Pulang pisau, survey, IKM app, IKM web, layanan terbaik, mendengarkan masukan, kebutuhan pelanggan, kualitas layanan, kepuasan pelanggan">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Gunung Media">
    <meta property="og:title" content="{{ config('app.name', 'FeedbackHub') }}">
    <meta property="og:description"
        content="Kami berkomitmen untuk mendengarkan masukan, memahami kebutuhan, dan terus meningkatkan kualitas layanan demi kepuasan Anda.">
    <meta property="og:image" content="/ss.png">
    <meta property="og:url" content="{{ config('app.url') }}">
    <meta property="og:type" content="website">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <title inertia>{{ config('app.name', 'FeedbackHub') }}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
        rel="stylesheet">


    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
    @inertiaHead
</head>

<body class="antialiased">
    @inertia
</body>

</html>
