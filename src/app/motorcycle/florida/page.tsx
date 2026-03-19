import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/florida");

export default function Page() {
  return <ExamPage examKey="motorcycle/florida" />;
}
