export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function textHasNumber(password: string): boolean{
    return /\d/.test(password);
  }
  
  export function isValidPassword(password: string): boolean {
    return password.length >= 8 && textHasNumber(password);
  }