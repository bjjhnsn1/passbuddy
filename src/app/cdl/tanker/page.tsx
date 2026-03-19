import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("cdl/tanker");

export default function Page() {
  return <ExamPage examKey="cdl/tanker" />;
}
