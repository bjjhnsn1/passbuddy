import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/kansas");

export default function Page() {
  return <ExamPage examKey="motorcycle/kansas" />;
}
