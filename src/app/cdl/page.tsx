import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("cdl");

export default function Page() {
  return <ExamPage examKey="cdl" />;
}
