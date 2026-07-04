{{-- Admin panel — serve o HTML estático do painel que usa a API via AJAX --}}
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin — EJ Tecnologia</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="stylesheet" href="/css/style.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>
  {{-- O admin.html completo é servido diretamente, incluindo todo o seu JS --}}
  @include('admin-content')
</body>
</html>
