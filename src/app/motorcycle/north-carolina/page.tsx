import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/north-carolina");

export default function Page() {
  return <ExamPage examKey="motorcycle/north-carolina" />;
}
