import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/massachusetts");

export default function Page() {
  return <ExamPage examKey="dmv/massachusetts" />;
}
