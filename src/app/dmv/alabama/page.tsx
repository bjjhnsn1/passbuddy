import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/alabama");

export default function Page() {
  return <ExamPage examKey="dmv/alabama" />;
}
