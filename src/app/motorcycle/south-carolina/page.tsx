import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/south-carolina");

export default function Page() {
  return <ExamPage examKey="motorcycle/south-carolina" />;
}
