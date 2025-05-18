export const activityOptions = [
  { value: "walk", label: "산책" },
  { value: "play", label: "놀이" },
  { value: "exercise", label: "운동" },
];

export const rehabilitationOptions = [
  { value: "yes", label: "참여" },
  { value: "no", label: "미참여" },
  { value: "none", label: "비대상" },
];

// value -> label 매핑 함수 (표시용)
export const getActivityLabel = (value: string) => {
  const match = activityOptions.find((opt) => opt.value === value);
  return match ? match.label : value;
};

// value -> label 매핑 함수 (표시용)
export const getRehabilitation = (value: string) => {
  const match = rehabilitationOptions.find((opt) => opt.value === value);
  return match ? match.label : value;
};
