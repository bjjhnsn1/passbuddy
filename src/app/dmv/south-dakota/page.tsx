import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/south-dakota");

export default function Page() {
  return <ExamPage examKey="dmv/south-dakota" />;
}
