import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/alaska");

export default function Page() {
  return <ExamPage examKey="dmv/alaska" />;
}
