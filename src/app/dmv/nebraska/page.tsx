import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/nebraska");

export default function Page() {
  return <ExamPage examKey="dmv/nebraska" />;
}
