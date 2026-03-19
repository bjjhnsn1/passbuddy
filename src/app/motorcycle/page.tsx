import ExamPage, { getExamMetadata } from "@/components/ExamPage";
import StateGrid from "@/components/StateGrid";

export const metadata = getExamMetadata("motorcycle");

export default function Page() {
  return (
    <ExamPage examKey="motorcycle">
      <StateGrid prefix="motorcycle" labelSuffix="" />
    </ExamPage>
  );
}
