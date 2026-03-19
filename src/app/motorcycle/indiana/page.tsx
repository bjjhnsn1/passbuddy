import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/indiana");

export default function Page() {
  return <ExamPage examKey="motorcycle/indiana" />;
}
