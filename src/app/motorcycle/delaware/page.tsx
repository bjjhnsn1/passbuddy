import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/delaware");

export default function Page() {
  return <ExamPage examKey="motorcycle/delaware" />;
}
