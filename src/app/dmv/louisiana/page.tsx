import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/louisiana");

export default function Page() {
  return <ExamPage examKey="dmv/louisiana" />;
}
