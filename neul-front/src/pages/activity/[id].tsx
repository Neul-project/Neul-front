import ActivityContent from "@/components/ActivityContent/Main";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ActivityDetail = () => {
  const router = useRouter();

  const { id } = router.query;
  if (!id) return null;
  //console.log("id", typeof id);

  return <ActivityContent id={id as string} />;
};

export default ActivityDetail;
