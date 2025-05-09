import * as Yup from "yup";

// 회원가입 유효성 검사
export const joinValidationSchema = Yup.object({
  // 일반 사용자 이메일
  email: Yup.string().when("role", {
    is: "user",
    then: (schema) =>
      schema
        .email("이메일 형식이 올바르지 않습니다.")
        .required("이메일은 필수입니다."),
    otherwise: (schema) => schema.notRequired(),
  }),

  // 관리자용 이메일 앞부분
  adminEmailPrefix: Yup.string().when("role", {
    is: "admin",
    then: (schema) =>
      schema
        .required("아이디는 필수입니다.")
        .max(15, "아이디는 15자 이하로 입력해주세요.")
        .matches(
          /^(?=[a-zA-Z0-9]*[a-zA-Z])[a-zA-Z0-9]+$/,
          "영문자와 숫자를 포함한 조합만 입력해주세요 (특수문자 제외)"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),

  password: Yup.string()
    .min(6, "6자리 이상 입력해주세요.")
    .required("비밀번호는 필수입니다."),
  passwordCheck: Yup.string()
    .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인은 필수입니다."),
  name: Yup.string().required("이름은 필수입니다."),
  wardName: Yup.string().required("피보호자 이름은 필수입니다."),
  phone: Yup.string()
    .matches(/^01[016789]\d{7,8}$/, "휴대전화번호가 정확한지 확인해 주세요.")
    .required("전화번호는 필수입니다."),
  birthYear: Yup.string().required("생년 입력").length(4, "4자리 연도"),
  birthMonth: Yup.string().required("월 입력").length(2, "2자리 월"),
  birthDay: Yup.string().required("일 입력").length(2, "2자리 일"),
  role: Yup.string().required("사용자 유형을 선택해주세요."),
});

// 로그인 유효성 검사
export const loginSchema = Yup.object({
  email: Yup.string()
    .email("유효한 이메일 형식을 입력해주세요.")
    .required("이메일은 필수입니다."),
  password: Yup.string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .required("비밀번호는 필수입니다."),
});

// 추가정보 입력 유효성 검사
export const moreInfoValidation = Yup.object({
  guardianName: Yup.string().required("보호자 이름은 필수입니다."),
  guardianPhone: Yup.string()
    .required("휴대폰 번호를 입력해주세요.")
    .matches(/^\d{10,11}$/, "전화번호는 숫자 10~11자리여야 합니다."),
  wardName: Yup.string().required("피보호자 이름은 필수입니다."),
  gender: Yup.string().required("성별을 선택해주세요."),
  birthYear: Yup.string().required("생년 입력").length(4, "4자리 연도"),
  birthMonth: Yup.string().required("월 입력").length(2, "2자리 월"),
  birthDay: Yup.string().required("일 입력").length(2, "2자리 일"),
  note: Yup.string(), // 선택 항목
});

// 비밀번호 변경 유효성 검사
export const changePwValidation = Yup.object().shape({
  password: Yup.string()
    .min(6, "비밀번호는 최소 6자리 이상이어야 합니다.")
    .required("비밀번호를 입력해주세요."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인을 입력해주세요."),
});
