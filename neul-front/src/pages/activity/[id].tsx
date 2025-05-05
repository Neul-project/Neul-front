import ActivityContent from "@/components/ActivityContent/Main";
import { useRouter } from "next/router";

const ActivityDetail = () => {
  const router = useRouter();

  const { id } = router.query;

  //console.log("id", typeof id);

  return <ActivityContent id={id as string} />;
};

export default ActivityDetail;
