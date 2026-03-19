import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/georgia");

export default function Page() {
  return <ExamPage examKey="dmv/georgia" />;
}
