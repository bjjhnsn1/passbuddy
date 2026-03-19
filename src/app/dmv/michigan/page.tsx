import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/michigan");

export default function Page() {
  return <ExamPage examKey="dmv/michigan" />;
}
