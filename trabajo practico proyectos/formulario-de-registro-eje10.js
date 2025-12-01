const form = document.getElementById("registroForm");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!nombre || !email || !password) {
        mensaje.textContent = "⚠️ Todos los campos son obligatorios.";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        mensaje.textContent = "❌ El correo no es válido.";
        return;
    }

    if (password.length < 6) {
        mensaje.textContent = "🔒 La contraseña debe tener al menos 6 caracteres.";
        return;
    }

    mensaje.style.color = "green";
    mensaje.textContent = "✅ Registro exitoso.";
    form.reset();
});