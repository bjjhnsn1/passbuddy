import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/maryland");

export default function Page() {
  return <ExamPage examKey="dmv/maryland" />;
}
