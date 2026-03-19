import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/pennsylvania");

export default function Page() {
  return <ExamPage examKey="dmv/pennsylvania" />;
}
