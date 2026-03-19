import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/tennessee");

export default function Page() {
  return <ExamPage examKey="motorcycle/tennessee" />;
}
