import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/arkansas");

export default function Page() {
  return <ExamPage examKey="motorcycle/arkansas" />;
}
