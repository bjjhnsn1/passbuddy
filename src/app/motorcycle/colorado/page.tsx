import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/colorado");

export default function Page() {
  return <ExamPage examKey="motorcycle/colorado" />;
}
