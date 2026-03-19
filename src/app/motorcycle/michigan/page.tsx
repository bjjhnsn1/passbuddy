import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/michigan");

export default function Page() {
  return <ExamPage examKey="motorcycle/michigan" />;
}
