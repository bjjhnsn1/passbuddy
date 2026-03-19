import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/missouri");

export default function Page() {
  return <ExamPage examKey="dmv/missouri" />;
}
