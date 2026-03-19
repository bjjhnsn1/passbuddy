import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/vermont");

export default function Page() {
  return <ExamPage examKey="motorcycle/vermont" />;
}
