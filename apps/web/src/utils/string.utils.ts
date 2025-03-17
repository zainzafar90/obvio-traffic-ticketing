export const getInitials = (name?: string) => {
  if (!name) {
    return '-';
  }

  const [firstName, lastName] = name.split(' ');

  if (!lastName || !firstName) {
    return firstName?.charAt(0) || '-';
  }

  return firstName.charAt(0) + lastName.charAt(0);
};
