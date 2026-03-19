import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/nevada");

export default function Page() {
  return <ExamPage examKey="dmv/nevada" />;
}
