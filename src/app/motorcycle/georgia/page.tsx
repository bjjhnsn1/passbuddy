import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/georgia");

export default function Page() {
  return <ExamPage examKey="motorcycle/georgia" />;
}
