import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/west-virginia");

export default function Page() {
  return <ExamPage examKey="motorcycle/west-virginia" />;
}
