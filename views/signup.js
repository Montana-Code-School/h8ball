<!doctype html>
<html>
<head>
    <title>8ball Sign up</title>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
    <style>
        body         { padding-top:80px; }
    </style>
</head>
<body>
<div class="container">
<div class="col-sm-6 col-sm-offset-3">

    <h1><span class="fa fa-sign-in"></span> Signup</h1>

    <% if (message.length > 0) { %>
        <div class="alert alert-danger"><%= message %></div>
    <% } %>

    <!-- LOGIN FORM -->
    <form action="/signup" method="post">
        <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" name="email">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" name="password">
        </div>

        <button type="submit" class="btn btn-warning btn-lg">Signup</button>
    </form>

    <hr>

    <p>Already have an account? <a href="/login">Login</a></p>
    <p>Or go <a href="/">home</a>.</p>

</div>
</div>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.js"></script>
</body>
</html>