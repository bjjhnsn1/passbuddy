import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/west-virginia");

export default function Page() {
  return <ExamPage examKey="dmv/west-virginia" />;
}
