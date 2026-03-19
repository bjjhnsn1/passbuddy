import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/hawaii");

export default function Page() {
  return <ExamPage examKey="dmv/hawaii" />;
}
