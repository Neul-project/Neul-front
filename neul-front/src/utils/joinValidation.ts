import * as Yup from "yup";

// 회원가입 유효성 검사
export const joinValidationSchema = Yup.object({
  // 일반 사용자 이메일
  email: Yup.string().when("role", {
    is: "user",
    then: (schema) =>
      schema
        .required("이메일은 필수입니다.")
        .min(4, "4자 이상 30자 이하로 입력해주세요.")
        .max(30, "4자 이상 30자 이하로 입력해주세요.")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "이메일 형식이 올바르지 않습니다."
        ),
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
          /^[a-zA-Z0-9]{4,}$/,
          "영문자, 숫자 또는 조합으로 4자 이상 입력해주세요 (특수문자 제외)"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),

  role: Yup.string().required("사용자 유형을 선택해주세요."),

  password: Yup.string()
    .required("비밀번호는 필수입니다.")
    .min(8, "최소 8자리 이상 입력해주세요.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "영문 대/소문자, 숫자, 특수문자를 포함해 8자리 이상 입력해주세요."
    ),

  passwordCheck: Yup.string()
    .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인은 필수입니다."),

  name: Yup.string().required("이름은 필수입니다."),

  phone: Yup.string()
    .matches(/^01[016789]\d{7,8}$/, "휴대전화번호가 정확한지 확인해 주세요.")
    .required("전화번호는 필수입니다."),

  // 피보호자 정보(일반 사용자만 필수)
  wardName: Yup.string().when("role", {
    is: "user",
    then: (schema) => schema.required("피보호자 이름은 필수입니다."),
    otherwise: (schema) => schema.notRequired(),
  }),

  birthYear: Yup.string().when("role", {
    is: (role: string) => role === "user" || role === "admin",
    then: (schema) =>
      schema
        .required("생년 입력")
        .length(4, "4자리 연도")
        .test("is-valid-year", "1900년 이후만 입력 가능합니다.", (value) => {
          return value ? parseInt(value) > 1900 : true;
        })
        .test(
          "is-not-future-year",
          "현재 연도 이하만 입력 가능합니다.",
          (value) => {
            const currentYear = new Date().getFullYear();
            return value ? parseInt(value) <= currentYear : true;
          }
        ),
    otherwise: (schema) => schema.notRequired(),
  }),

  birthMonth: Yup.string().when("role", {
    is: (role: string) => role === "user" || role === "admin",
    then: (schema) =>
      schema
        .required("월 입력")
        .length(2, "2자리 월")
        .test("is-valid-month", "1~12월만 입력 가능합니다.", (value) => {
          const num = Number(value);
          return !isNaN(num) && num >= 1 && num <= 12;
        }),
    otherwise: (schema) => schema.notRequired(),
  }),

  birthDay: Yup.string().when("role", {
    is: (role: string) => role === "user" || role === "admin",
    then: (schema) =>
      schema
        .required("일 입력")
        .length(2, "2자리 일")
        .test("is-valid-day", "1~31일만 입력 가능합니다.", (value) => {
          const num = Number(value);
          return !isNaN(num) && num >= 1 && num <= 31;
        }),
    otherwise: (schema) => schema.notRequired(),
  }),
  // 도우미 조건 추가
  // 희망 일당
  desiredPay: Yup.string().when("role", {
    is: "admin",
    then: (schema) => schema.required("희망 일당은 필수입니다."),
    otherwise: (schema) => schema.notRequired(),
  }),
  // 경력 사항
  experience: Yup.string().when("role", {
    is: "admin",
    then: (schema) =>
      schema
        .required("경력 사항은 필수입니다.")
        .max(500, "최대 500자까지 입력 가능합니다."),
    otherwise: (schema) => schema.notRequired(),
  }),

  // 자격증 명
  certificateName_01: Yup.string().when("role", {
    is: "admin",
    then: (schema) => schema.required("자격증 명은 필수입니다."),
    otherwise: (schema) => schema.notRequired(),
  }),
  certificateName_02: Yup.string().notRequired(), // 선택 항목
  certificateName_03: Yup.string().notRequired(), // 선택 항목

  // 자격증 파일
  certificate: Yup.mixed().when("role", {
    is: "admin",
    then: (schema) =>
      schema
        .required("자격증 업로드는 필수입니다.")
        .test(
          "fileFormat",
          "자격증은 PDF, JPG, PNG 형식만 가능합니다.",
          (value) =>
            value instanceof File &&
            ["application/pdf", "image/jpeg", "image/png"].includes(value.type)
        ),
    otherwise: (schema) => schema.notRequired(),
  }),

  // 프로필 이미지
  profileImage: Yup.mixed().when("role", {
    is: "admin",
    then: (schema) =>
      schema
        .required("프로필 사진 업로드는 필수입니다.")
        .test(
          "fileFormat",
          "이미지는 JPG, PNG 형식만 가능합니다.",
          (value) =>
            value instanceof File &&
            ["image/jpeg", "image/png"].includes(value.type)
        )
        .test(
          "fileSize",
          "이미지 크기는 500KB 이하만 가능합니다.",
          (value) => value instanceof File && value.size <= 500 * 1024 // 500KB 제한
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
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

// 도우미 '승인 반려' 후 정보 수정 시 유효성 검사
export const editHelperValidationSchema = Yup.object({
  desiredPay: Yup.number()
    .typeError("희망 일당은 숫자만 입력 가능합니다.")
    .required("희망 일당을 입력해주세요.")
    .min(0, "0원 이상 입력해주세요."),

  experience: Yup.string()
    .required("경력 사항을 입력해주세요.")
    .max(1000, "경력 사항은 1000자 이내로 입력해주세요."),

  certificateName_01: Yup.string()
    .required("자격증 명을 입력해주세요.")
    .max(30, "자격증 명은 30자 이내로 입력해주세요."),

  certificateName_02: Yup.string().notRequired(), // 선택 항목
  certificateName_03: Yup.string().notRequired(), // 선택 항목

  // 자격증 파일 유효성: 있으면 형식 검사, 없으면 통과
  certificate: Yup.mixed().test(
    "fileFormat",
    "자격증은 PDF, JPG, PNG 형식만 가능합니다.",
    (value) => {
      if (!value) return true;
      return (
        value instanceof File &&
        ["application/pdf", "image/jpeg", "image/png"].includes(value.type)
      );
    }
  ),

  // 프로필 이미지 유효성: 있으면 형식 검사, 없으면 통과
  profileImage: Yup.mixed().test(
    "fileFormat",
    "이미지는 JPG, PNG 형식만 가능합니다.",
    (value) => {
      if (!value) return true;
      return (
        value instanceof File &&
        ["image/jpeg", "image/png"].includes(value.type)
      );
    }
  ),
});
