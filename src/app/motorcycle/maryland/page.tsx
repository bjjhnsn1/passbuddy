import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/maryland");

export default function Page() {
  return <ExamPage examKey="motorcycle/maryland" />;
}
