import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/wisconsin");

export default function Page() {
  return <ExamPage examKey="motorcycle/wisconsin" />;
}
