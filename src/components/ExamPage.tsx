import { Metadata } from "next";
import { exams, categoryNav, allCategories } from "@/config";
import { Question } from "@/types";
import ExamClient from "./ExamClient";
import Link from "next/link";
import fs from "fs";
import path from "path";

interface ExamPageProps {
  examKey: string;
  children?: React.ReactNode;
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

export default function ExamPage({ examKey, children }: ExamPageProps) {
  const config = exams[examKey];
  const dataPath = path.join(process.cwd(), "public", config.dataPath);
  const pool: Question[] = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  // Randomly select 10 questions from the curated pool at build time
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  const questions = shuffled.slice(0, 10);

  const cat = categoryNav[config.category];
  const currentPath = `/${config.slug}`;

  // Cross-category links (everything except current category)
  const crossCategoryLinks = allCategories
    .filter((c) => c.href !== cat.href)
    .map((c) => ({ href: c.href, label: `${c.label} Practice Test` }));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link
              href="/"
              className="text-xl font-bold text-blue-600 hover:text-blue-700"
            >
              PassBuddy
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href={cat.href}
                className="text-sm font-semibold text-gray-900 hover:text-blue-600"
              >
                {cat.label}
              </Link>
              <a
                href={config.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-blue-600 transition-colors hidden sm:block"
              >
                Get the App
              </a>
            </div>
          </div>
          {cat.topics.length > 0 && (
            <nav className="flex gap-2 overflow-x-auto pb-1 -mb-1">
              <Link
                href={cat.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  currentPath === cat.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                All {cat.label}
              </Link>
              {cat.topics.map((topic) => (
                <Link
                  key={topic.href}
                  href={topic.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    currentPath === topic.href
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {topic.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {config.title}
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            {config.description}
          </p>
        </div>

        <ExamClient
          questions={questions}
          appStoreUrl={config.appStoreUrl}
          relatedTopics={config.relatedTopics}
          crossCategoryLinks={crossCategoryLinks}
          totalQuestionCount={config.totalQuestionCount}
        />

        {children}
      </main>

      <footer className="border-t border-gray-200 mt-16 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm">
            {allCategories.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                {c.label} Practice Test
              </Link>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PassBuddy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
