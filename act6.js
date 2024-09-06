// Crear una nueva instancia del objeto Particle para interactuar con la API de Particle.
particle = new Particle();
var token; // Variable para almacenar el token de acceso obtenido después de iniciar sesión.

// Iniciar sesión en Particle con un nombre de usuario y una contraseña.
particle.login({username: 'yestrada4@ucol.mx', password: 'yahirparticle'}).then(
    function(data) {
        // Si el inicio de sesión es exitoso, almacenar el token de acceso en la variable `token`.
        token = data.body.access_token;
    },
    function (err) {
        // Si el inicio de sesión falla, mostrar un mensaje de error en la consola.
        console.log('No se pudo iniciar sesión.', err);
    }
);

// Añadir un evento de escucha al slider para actualizar el valor cuando se mueve.
document.getElementById('Ktms').addEventListener('input', function() {
    var sliderValue = this.value; // Obtener el valor actual del slider.
    var output = document.getElementById('Kvaluetms'); // Obtener el elemento donde se mostrará el valor del slider.
    var resultElement = document.getElementById('TMSvalue'); // Obtener el elemento donde se mostrará el resultado calculado.

    output.innerHTML = sliderValue; // Actualizar el valor mostrado del slider.

    // Llamar a una función del dispositivo Particle utilizando la API.
    particle.callFunction({
        deviceId: '24002d001447313036303933', // ID del dispositivo Particle al que se quiere llamar.
        name: 'TMS_2', // Nombre de la función que se quiere invocar en el dispositivo.
        argument: sliderValue, // Valor del slider que se pasará como argumento a la función.
        auth: token // Token de acceso para autenticar la llamada a la API.
    }).then(
        function(data) {
            // Si la llamada a la función es exitosa, mostrar el valor retornado por la función en el dispositivo.
            var result = parseFloat(data.body.return_value); // Convertir el valor retornado a un número flotante.
            resultElement.innerHTML = result; // Mostrar el valor calculado en el elemento correspondiente.
        },
        function(err) {
            // Si ocurre un error al llamar a la función, mostrar un mensaje de error y actualizar el elemento con 'Error'.
            console.log('Error al llamar a la función:', err);
            resultElement.innerHTML = 'Error';
        }
    );
});
