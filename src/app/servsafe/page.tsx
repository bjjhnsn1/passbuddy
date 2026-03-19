import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("servsafe");

export default function Page() {
  return <ExamPage examKey="servsafe" />;
}
