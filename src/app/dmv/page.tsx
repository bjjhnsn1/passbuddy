import ExamPage, { getExamMetadata } from "@/components/ExamPage";
import StateGrid from "@/components/StateGrid";

export const metadata = getExamMetadata("dmv");

export default function Page() {
  return (
    <ExamPage examKey="dmv">
      <StateGrid prefix="dmv" labelSuffix="" />
    </ExamPage>
  );
}
