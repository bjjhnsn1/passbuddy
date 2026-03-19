import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("cdl/air-brakes");

export default function Page() {
  return <ExamPage examKey="cdl/air-brakes" />;
}
