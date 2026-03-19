"use client";

import { useState } from "react";
import Link from "next/link";
import { Question } from "@/types";

interface ExamClientProps {
  questions: Question[];
  appStoreUrl: string;
  relatedTopics: { href: string; label: string }[];
}

export default function ExamClient({
  questions,
  appStoreUrl,
  relatedTopics,
}: ExamClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = questions[currentIndex];
  const total = questions.length;

  function handleSelect(idx: number) {
    if (answered) return;
    setSelectedAnswer(idx);
    setAnswered(true);
    if (question.answers[idx].isCorrect) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (currentIndex + 1 >= total) {
      setFinished(true);
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

  if (finished) {
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 70;
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div
            className={`text-6xl font-bold mb-2 ${passed ? "text-green-600" : "text-red-500"}`}
          >
            {pct}%
          </div>
          <p className="text-xl text-gray-700 mb-1">
            You got {score} out of {total} correct
          </p>
          <p
            className={`text-lg font-semibold mb-8 ${passed ? "text-green-600" : "text-red-500"}`}
          >
            {passed ? "You passed!" : "Keep practicing!"}
          </p>

          <div className="mb-8">
            <p className="text-gray-600 mb-4">
              Get unlimited practice questions and track your progress:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download on the App Store
              </a>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="text-blue-600 hover:text-blue-800 font-medium underline mb-8 block mx-auto"
          >
            Try Again
          </button>

          {relatedTopics.length > 0 && (
            <div className="border-t pt-6">
              <p className="text-gray-600 mb-3 font-medium">
                Practice more topics:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {relatedTopics.map((topic) => (
                  <Link
                    key={topic.href}
                    href={topic.href}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    {topic.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>
            Question {currentIndex + 1} of {total}
          </span>
          <span>
            Score: {score}/{currentIndex + (answered ? 1 : 0)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + (answered ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.answers.map((answer, idx) => {
            let classes =
              "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ";
            if (!answered) {
              classes +=
                selectedAnswer === idx
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50";
            } else if (answer.isCorrect) {
              classes += "border-green-500 bg-green-50";
            } else if (idx === selectedAnswer) {
              classes += "border-red-500 bg-red-50";
            } else {
              classes += "border-gray-200 opacity-60";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={answered}
                className={classes}
              >
                <span className="font-medium text-gray-800">{answer.text}</span>
                {answered && answer.isCorrect && answer.explanation && (
                  <p className="mt-2 text-sm text-green-700">{answer.explanation}</p>
                )}
                {answered &&
                  idx === selectedAnswer &&
                  !answer.isCorrect &&
                  question.explanation && (
                    <p className="mt-2 text-sm text-red-600">
                      {question.explanation}
                    </p>
                  )}
              </button>
            );
          })}
        </div>

        {answered && (
          <button
            onClick={handleNext}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            {currentIndex + 1 >= total ? "See Results" : "Next Question"}
          </button>
        )}
      </div>

      {/* Related topics */}
      {relatedTopics.length > 0 && (
        <div className="mt-8">
          <p className="text-gray-500 text-sm mb-2">Related practice tests:</p>
          <div className="flex flex-wrap gap-2">
            {relatedTopics.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="px-3 py-1.5 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm border border-gray-200"
              >
                {topic.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
