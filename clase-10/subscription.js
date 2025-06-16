var form = document.getElementById('subscriptionForm');
var fields = ['name', 'email', 'password', 'repeatPassword', 'age', 'phone', 'address', 'city', 'postalCode', 'id'];

function showError(field, message) {
    document.getElementById('error-' + field).textContent = message;
    document.getElementById(field).style.borderColor = '#ff0000';
}
  
function clearError(field) {
    document.getElementById('error-' + field).textContent = '';
    document.getElementById(field).style.borderColor = '#00ff37'  
}
  
function validateField(field) {
    var value = document.getElementById(field).value;
    var valid = true;
  
    switch (field) {
        case 'name':
            if (value.length <= 6 || value.indexOf(' ') === -1) {
                showError(field, 'Debe tener más de 6 letras y al menos un espacio.');
                valid = false;
            }
            break;
        case 'email':
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showError(field, 'Email no válido.');
                    valid = false;
                }
			break;
        case 'password':
            var passRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
            if (!passRegex.test(value)) {
                showError(field, 'Debe tener al menos 8 caracteres, letras y números.');
                valid = false;
            }
            break;
        case 'repeatPassword':
            var password = document.getElementById('password').value;
            if (value !== password) {
                showError(field, 'Las contraseñas no coinciden.');
                valid = false;
            }
            break;
        case 'age':
            var age = parseInt(value, 10);
            if (isNaN(age) || age < 18) {
                showError(field, 'Debes ser mayor de 18.');
                valid = false;
            }
            break;
        case 'phone':
            if (!/^\d{7,}$/.test(value)) {
                showError(field, 'Teléfono debe tener al menos 7 dígitos, sin espacios ni símbolos.');
                valid = false;
            }
            break;
        case 'address':
            if (value.length < 5 || value.indexOf(' ') === -1) {
                showError(field, 'Dirección inválida. Debe contener letras, números y un espacio.');
                valid = false;
            }
            break;
        case 'city':
            if (value.length < 3) {
                showError(field, 'Ciudad debe tener al menos 3 caracteres.');
                valid = false;
            }
            break;
        case 'postalCode':
            if (value.length < 3) {
                showError(field, 'Código postal inválido.');
                valid = false;
            }
            break;
        case 'id':
            if (!/^\d{7,8}$/.test(value)) {
                showError(field, 'DNI debe tener 7 u 8 dígitos.');
                valid = false;
            }
            break;
        }
    
        return valid;
}
  
for (var i = 0; i < fields.length; i++) {
    (function (field) {
        var input = document.getElementById(field);
		var valid = false
		
		input.addEventListener('blur', function () {
            valid = validateField(field);
				if (valid) clearError(field)
        });
		
		input.addEventListener('focus', function () {
			valid = validateField(field);
				if (valid) clearError(field)
        });
  
        if (field === 'name') {
            input.addEventListener('keydown', function () {
                document.getElementById('form-title').textContent = 'HOLA ' + input.value;
          });
  
            input.addEventListener('focus', function () {
                document.getElementById('form-title').textContent = 'HOLA ' + input.value;
          });
        }
      })(fields[i]);
}
  
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var allValid = true;
        var mensaje = '';
  
        for (var i = 0; i < fields.length; i++) {
            var valid = validateField(fields[i]);
                if (!valid) {
                    allValid = false;
                }
        }
  
        if (allValid) {
            for (var j = 0; j < fields.length; j++) {
                mensaje += fields[j] + ': ' + document.getElementById(fields[j]).value + '\n';
            }
        alert('Formulario enviado con éxito:\n\n' + mensaje);
        }   else {
        alert('Por favor corrige los errores antes de enviar el formulario.');
        }
    });
