"use client";

import { useState } from "react";
import Link from "next/link";
import { Question } from "@/types";

interface ExamClientProps {
  questions: Question[];
  appStoreUrl: string;
  relatedTopics: { href: string; label: string }[];
  crossCategoryLinks: { href: string; label: string }[];
  totalQuestionCount: string;
}

export default function ExamClient({
  questions,
  appStoreUrl,
  relatedTopics,
  crossCategoryLinks,
  totalQuestionCount,
}: ExamClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = questions[currentIndex];
  const total = questions.length;

  function trackEvent(action: string, params?: Record<string, string | number>) {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", action, params);
    }
  }

  function handleSelect(idx: number) {
    if (answered) return;
    setSelectedAnswer(idx);
    setAnswered(true);
    const correct = question.answers[idx].isCorrect;
    if (correct) {
      setScore((s) => s + 1);
    }
    trackEvent("answer_question", {
      question_number: currentIndex + 1,
      correct: correct ? "yes" : "no",
    });
  }

  function handleNext() {
    if (currentIndex + 1 >= total) {
      setFinished(true);
      trackEvent("exam_complete", {
        score: score,
        total: total,
        percentage: Math.round((score / total) * 100),
      });
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswered(false);
    setFinished(false);
  }

  // --- Score Screen ---
  if (finished) {
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 70;
    return (
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 text-center">
          {/* Score circle */}
          <div
            className={`inline-flex items-center justify-center w-28 h-28 rounded-full mb-4 ${
              passed ? "bg-green-50 ring-4 ring-green-200" : "bg-red-50 ring-4 ring-red-200"
            }`}
          >
            <span
              className={`text-4xl font-bold ${passed ? "text-green-600" : "text-red-500"}`}
            >
              {pct}%
            </span>
          </div>

          <p className="text-lg text-gray-700 mb-1">
            {score} out of {total} correct
          </p>
          <p
            className={`text-base font-semibold mb-8 ${
              passed ? "text-green-600" : "text-amber-600"
            }`}
          >
            {passed ? "Great job — you passed!" : "Almost there — keep studying!"}
          </p>

          {/* App CTA */}
          {appStoreUrl && (
            <div className="mb-6 bg-gray-50 rounded-xl p-5">
              <p className="text-gray-700 font-medium text-sm mb-1">
                {passed ? "Ready for the real exam?" : "Want more practice?"}
              </p>
              <p className="text-gray-500 text-xs mb-4">
                {passed
                  ? `${totalQuestionCount} questions with full explanations in the app.`
                  : `The app has ${totalQuestionCount} questions to get you ready.`}
              </p>
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("app_store_click", { location: "score_screen", score: score, total: total })}
                className="inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download on the App Store
              </a>
            </div>
          )}

          <button
            onClick={handleRestart}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm mb-6 block mx-auto"
          >
            Retake this exam
          </button>

          {/* Same-category topics */}
          {relatedTopics.length > 0 && (
            <div className="border-t pt-5">
              <p className="text-gray-500 mb-3 text-sm font-medium">
                Try another topic
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {relatedTopics.map((topic) => (
                  <Link
                    key={topic.href}
                    href={topic.href}
                    className="px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    {topic.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Cross-category */}
          {crossCategoryLinks.length > 0 && (
            <div className="border-t pt-5 mt-5">
              <p className="text-gray-400 mb-3 text-xs">Explore other exams</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {crossCategoryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-1.5 text-gray-500 hover:text-blue-600 text-xs transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- Exam Flow ---
  const gotItWrong =
    answered &&
    selectedAnswer !== null &&
    !question.answers[selectedAnswer].isCorrect;

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>
            Question {currentIndex + 1} of {total}
          </span>
          <span>
            {score}/{currentIndex + (answered ? 1 : 0)} correct
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + (answered ? 1 : 0)) / total) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-5 leading-relaxed">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.answers.map((answer, idx) => {
            let classes =
              "w-full text-left px-4 py-4 sm:py-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer ";
            if (!answered) {
              classes +=
                selectedAnswer === idx
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 active:bg-gray-50";
            } else if (answer.isCorrect) {
              classes += "border-green-500 bg-green-50";
            } else if (idx === selectedAnswer) {
              classes += "border-red-400 bg-red-50";
            } else {
              classes += "border-gray-100 opacity-50";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={answered}
                className={classes}
              >
                <span className="text-sm sm:text-base text-gray-800 leading-snug">
                  {answer.text}
                </span>
                {answered && answer.isCorrect && question.explanation && (
                  <p className="mt-2 text-sm text-green-700 leading-relaxed">
                    {question.explanation}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* Wrong answer nudge */}
        {gotItWrong && (
          <p className="mt-4 text-xs text-gray-400 text-center">
            The full app has {totalQuestionCount} questions like this one.
          </p>
        )}

        {answered && (
          <button
            onClick={handleNext}
            className="mt-5 w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm sm:text-base"
          >
            {currentIndex + 1 >= total ? "See Results" : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
}
