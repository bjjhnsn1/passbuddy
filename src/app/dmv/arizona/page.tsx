import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/arizona");

export default function Page() {
  return <ExamPage examKey="dmv/arizona" />;
}
