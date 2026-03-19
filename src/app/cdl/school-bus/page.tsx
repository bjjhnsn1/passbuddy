import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("cdl/school-bus");

export default function Page() {
  return <ExamPage examKey="cdl/school-bus" />;
}
