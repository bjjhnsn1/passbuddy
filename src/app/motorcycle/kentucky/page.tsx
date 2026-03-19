import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/kentucky");

export default function Page() {
  return <ExamPage examKey="motorcycle/kentucky" />;
}
