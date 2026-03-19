import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/connecticut");

export default function Page() {
  return <ExamPage examKey="dmv/connecticut" />;
}
