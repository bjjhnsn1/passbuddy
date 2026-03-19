import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/illinois");

export default function Page() {
  return <ExamPage examKey="dmv/illinois" />;
}
