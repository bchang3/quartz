import InfoBox from "@/lib/components/InfoBox";
import IssuePage from "@/lib/components/IssuePage";
import { Issue } from "@/lib/utils/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DisplayIssue() {
  const [issue, setIssue] = useState<Issue>();
  const router = useRouter();
  const { id } = router.query;
  const getIssueById = async (id: string) => {
    if (id) {
      const res = await fetch(`/api/getissuebyid?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await res.json())["issue"] as Issue;
      data["date"] = new Date(data["date"]);
      setIssue(data);
    }
  };

  useEffect(() => {
    getIssueById(id as string);
  }, [id]);

  return (
    <div className="font-inter w-screen flex justify-center">
      {issue && <IssuePage issue={issue} />}
    </div>
  );
}
