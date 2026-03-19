import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/montana");

export default function Page() {
  return <ExamPage examKey="dmv/montana" />;
}
