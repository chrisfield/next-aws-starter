export const passwordsMatch = (repeatPassword, password) => (
  repeatPassword === password ? undefined: 'Passwords must match'
);
