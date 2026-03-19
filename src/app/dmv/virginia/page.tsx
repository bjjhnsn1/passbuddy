import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/virginia");

export default function Page() {
  return <ExamPage examKey="dmv/virginia" />;
}
