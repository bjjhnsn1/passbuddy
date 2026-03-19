import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/wyoming");

export default function Page() {
  return <ExamPage examKey="dmv/wyoming" />;
}
