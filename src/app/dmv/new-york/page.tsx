import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/new-york");

export default function Page() {
  return <ExamPage examKey="dmv/new-york" />;
}
