const isValidEmail = (email: string) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return regex.test(email);
};

export default isValidEmail;
