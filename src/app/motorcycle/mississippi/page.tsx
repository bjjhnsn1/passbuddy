import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/mississippi");

export default function Page() {
  return <ExamPage examKey="motorcycle/mississippi" />;
}
