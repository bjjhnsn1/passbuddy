import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/illinois");

export default function Page() {
  return <ExamPage examKey="motorcycle/illinois" />;
}
