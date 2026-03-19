import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/indiana");

export default function Page() {
  return <ExamPage examKey="dmv/indiana" />;
}
