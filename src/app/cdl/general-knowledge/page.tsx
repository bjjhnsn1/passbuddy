import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("cdl/general-knowledge");

export default function Page() {
  return <ExamPage examKey="cdl/general-knowledge" />;
}
