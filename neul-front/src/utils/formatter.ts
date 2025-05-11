// 휴대전화번호(01011111111) -> 010-1111-1111 포맷
export const formatPhoneNumber = (phone: string): string => {
  if (!phone || phone.length !== 11) return phone;
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

// 생년월일(1999-01-01) -> 만 ??세 포맷
export const formatAge = (birth: string): string => {
  if (!birth) return "";

  const today = new Date();
  const birthDate = new Date(birth);

  let age = today.getFullYear() - birthDate.getFullYear();

  // 아직 생일이 안 지났으면 나이 -1
  const isBeforeBirthday =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate());

  if (isBeforeBirthday) {
    age--;
  }

  return `만 ${age}세`;
};
