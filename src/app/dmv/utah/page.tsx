import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/utah");

export default function Page() {
  return <ExamPage examKey="dmv/utah" />;
}
