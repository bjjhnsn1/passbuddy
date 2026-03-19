import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/idaho");

export default function Page() {
  return <ExamPage examKey="dmv/idaho" />;
}
