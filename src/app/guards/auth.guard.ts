import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('tokenEdition');
  if (token && token === 'true') {
    // Aquí puedes agregar lógica adicional para validar el token
    return true;
  } else {
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = '/login';
    return false;
  }
};
