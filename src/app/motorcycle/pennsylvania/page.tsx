import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/pennsylvania");

export default function Page() {
  return <ExamPage examKey="motorcycle/pennsylvania" />;
}
