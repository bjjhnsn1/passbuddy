import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/massachusetts");

export default function Page() {
  return <ExamPage examKey="motorcycle/massachusetts" />;
}
