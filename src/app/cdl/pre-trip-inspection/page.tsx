import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("cdl/pre-trip-inspection");

export default function Page() {
  return <ExamPage examKey="cdl/pre-trip-inspection" />;
}
