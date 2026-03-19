import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/texas");

export default function Page() {
  return <ExamPage examKey="motorcycle/texas" />;
}
