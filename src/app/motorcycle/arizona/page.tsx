import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/arizona");

export default function Page() {
  return <ExamPage examKey="motorcycle/arizona" />;
}
