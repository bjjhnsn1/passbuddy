import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("cdl/combination-vehicles");

export default function Page() {
  return <ExamPage examKey="cdl/combination-vehicles" />;
}
