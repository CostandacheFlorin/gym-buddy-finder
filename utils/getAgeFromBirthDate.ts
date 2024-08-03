export default function calculateAge(birthdate: Date): number {
  if (!(birthdate instanceof Date) || isNaN(birthdate.getTime())) {
    throw new Error("Invalid birthdate");
  }

  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDifference = today.getMonth() - birthdate.getMonth();

  // Adjust age if the current month is before the birth month
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  return age;
}
