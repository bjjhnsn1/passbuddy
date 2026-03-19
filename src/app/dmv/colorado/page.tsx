import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/colorado");

export default function Page() {
  return <ExamPage examKey="dmv/colorado" />;
}
