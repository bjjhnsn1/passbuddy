import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/kansas");

export default function Page() {
  return <ExamPage examKey="dmv/kansas" />;
}
