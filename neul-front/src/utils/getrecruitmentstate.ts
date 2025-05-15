export function getRecruitmentState(
  recruitment: string
): "모집예정" | "모집중" | "모집완료" | undefined {
  if (!recruitment) return;

  const recru = recruitment.split("~").map((d) => d.trim());

  const today = new Date();
  let startDate: Date;
  let endDate: Date;

  if (recru.length === 1) {
    startDate = new Date(recru[0]);
    endDate = new Date(recru[0]);
  } else {
    startDate = new Date(recru[0]);
    endDate = new Date(recru[1]);
  }

  if (today < startDate) {
    return "모집예정";
  } else if (today >= startDate && today <= endDate) {
    return "모집중";
  } else {
    return "모집완료";
  }
}
