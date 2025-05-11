// 휴대폰 번호 포맷
export const formatPhoneNumber = (phone: string): string => {
  if (!phone || phone.length !== 11) return phone;
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};
