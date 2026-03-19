import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/florida");

export default function Page() {
  return <ExamPage examKey="dmv/florida" />;
}
