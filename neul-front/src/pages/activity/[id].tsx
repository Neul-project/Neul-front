import ActivityContent from "@/components/ActivityContent/Main";
import { useRouter } from "next/router";

const ActivityDetail = () => {
  const router = useRouter();

  const { id } = router.query;

  //console.log("id", id);

  return <ActivityContent />;
};

export default ActivityDetail;
