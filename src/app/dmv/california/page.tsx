import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("dmv/california");

export default function Page() {
  return <ExamPage examKey="dmv/california" />;
}
