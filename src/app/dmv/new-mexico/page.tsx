import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/new-mexico");

export default function Page() {
  return <ExamPage examKey="dmv/new-mexico" />;
}
