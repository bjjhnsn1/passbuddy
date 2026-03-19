import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("cdl/hazmat");

export default function Page() {
  return <ExamPage examKey="cdl/hazmat" />;
}
