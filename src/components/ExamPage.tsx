import { Metadata } from "next";
import { exams, categoryNav, allCategories } from "@/config";
import { Question } from "@/types";
import ExamClient from "./ExamClient";
import JsonLd from "./JsonLd";
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
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: config.metaTitle,
      description: config.metaDescription,
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://passbuddy.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: cat.label,
        item: `https://passbuddy.app${cat.href}`,
      },
      ...(currentPath !== cat.href
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: config.title,
              item: `https://passbuddy.app${currentPath}`,
            },
          ]
        : []),
    ],
  };

  const quizJsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: config.title,
    description: config.description,
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: config.category.toUpperCase(),
    },
    provider: {
      "@type": "Organization",
      name: "PassBuddy",
      url: "https://passbuddy.app",
    },
    isAccessibleForFree: true,
    typicalAgeRange: "16-",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={quizJsonLd} />
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
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
              {(config.category === "dmv" || config.category === "motorcycle") && (
                <a
                  href={`${cat.href}#all-states`}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  All 50 states &rarr;
                </a>
              )}
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

        {children || (
          <ExamClient
            questions={questions}
            appStoreUrl={config.appStoreUrl}
            relatedTopics={config.relatedTopics}
            crossCategoryLinks={crossCategoryLinks}
            totalQuestionCount={config.totalQuestionCount}
          />
        )}
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
