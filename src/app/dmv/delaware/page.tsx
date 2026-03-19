import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/delaware");

export default function Page() {
  return <ExamPage examKey="dmv/delaware" />;
}
