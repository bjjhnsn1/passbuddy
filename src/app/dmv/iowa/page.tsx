import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/iowa");

export default function Page() {
  return <ExamPage examKey="dmv/iowa" />;
}
