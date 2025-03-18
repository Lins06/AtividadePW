function validarLogin(event) {
    event.preventDefault();
    
    const login = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    
    if (login === "admin" && senha === "123456") {
        alert("Login bem-sucedido!");
        window.location.href = "dashboard.html";
    } else {
        alert("Login ou senha incorretos!");
    }
}

document.querySelector(".entrar input[type='submit']").addEventListener("click", validarLogin);
