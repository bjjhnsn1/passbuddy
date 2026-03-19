import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/north-carolina");

export default function Page() {
  return <ExamPage examKey="dmv/north-carolina" />;
}
