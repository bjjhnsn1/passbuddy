import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/hawaii");

export default function Page() {
  return <ExamPage examKey="motorcycle/hawaii" />;
}
