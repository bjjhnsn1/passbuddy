import { Metadata } from "next";
import { exams } from "@/config";
import { Question } from "@/types";
import ExamClient from "./ExamClient";
import Link from "next/link";
import fs from "fs";
import path from "path";

interface ExamPageProps {
  examKey: string;
}

export function getExamMetadata(examKey: string): Metadata {
  const config = exams[examKey];
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      type: "website",
      siteName: "PassBuddy",
    },
  };
}

export default function ExamPage({ examKey }: ExamPageProps) {
  const config = exams[examKey];
  const dataPath = path.join(process.cwd(), "public", config.dataPath);
  const pool: Question[] = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  // Randomly select 10 questions from the curated pool at build time
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  const questions = shuffled.slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-blue-600 hover:text-blue-700"
          >
            PassBuddy
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/cdl" className="text-gray-600 hover:text-blue-600">CDL</Link>
            <Link href="/dmv" className="text-gray-600 hover:text-blue-600">DMV</Link>
            <Link href="/motorcycle" className="text-gray-600 hover:text-blue-600">Motorcycle</Link>
            <Link href="/servsafe" className="text-gray-600 hover:text-blue-600">ServSafe</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{config.title}</h1>
          <p className="text-gray-600 max-w-xl mx-auto">{config.description}</p>
        </div>

        <ExamClient
          questions={questions}
          appStoreUrl={config.appStoreUrl}
          relatedTopics={config.relatedTopics}
        />
      </main>

      <footer className="border-t border-gray-200 mt-16 py-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} PassBuddy. All rights reserved.</p>
      </footer>
    </div>
  );
}
