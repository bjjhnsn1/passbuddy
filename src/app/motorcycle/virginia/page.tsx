import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/virginia");

export default function Page() {
  return <ExamPage examKey="motorcycle/virginia" />;
}
