import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/iowa");

export default function Page() {
  return <ExamPage examKey="motorcycle/iowa" />;
}
