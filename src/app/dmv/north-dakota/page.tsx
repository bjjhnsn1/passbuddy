import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/north-dakota");

export default function Page() {
  return <ExamPage examKey="dmv/north-dakota" />;
}
