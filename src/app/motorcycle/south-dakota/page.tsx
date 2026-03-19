import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/south-dakota");

export default function Page() {
  return <ExamPage examKey="motorcycle/south-dakota" />;
}
