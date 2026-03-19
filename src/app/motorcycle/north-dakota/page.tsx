import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/north-dakota");

export default function Page() {
  return <ExamPage examKey="motorcycle/north-dakota" />;
}
