import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/alaska");

export default function Page() {
  return <ExamPage examKey="motorcycle/alaska" />;
}
