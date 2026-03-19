import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/wyoming");

export default function Page() {
  return <ExamPage examKey="motorcycle/wyoming" />;
}
