import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/new-jersey");

export default function Page() {
  return <ExamPage examKey="motorcycle/new-jersey" />;
}
