import ProgramDetail from "@/features/ProgramDetail/Main";
import { useRouter } from "next/router";

const ProgramDetailPage = () => {
  const router = useRouter();

  const { id } = router.query;

  return <ProgramDetail detailid={id as string} />;
};

export default ProgramDetailPage;
