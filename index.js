function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Hier würden normalerweise die Anmeldedaten überprüft werden
    // Dies ist nur ein Beispiel und sollte nicht in der Produktion verwendet werden
    if (username === 'admin' && password === 'password123') {
        window.location.href = 'home.html';
    } else {
        alert('Falscher Benutzername oder Passwort.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        login();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const option1 = document.getElementById('option1');
    const option2 = document.getElementById('option2');
    const logoutButton = document.getElementById('logoutButton');

    option1.addEventListener('click', function() {
        alert('Sie haben Option 1 gewählt');
        // Hier könnte eine Weiterleitung erfolgen
    });

    option2.addEventListener('click', function() {
        window.location.href="snake.html";
    });

    logoutButton.addEventListener('click', function() {
        // Zurück zur Login-Seite
        window.location.href = 'index.html';
    });
});