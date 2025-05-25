'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import QuizCard from '@/components/quiz/QuizCard';
import { useAuth } from '@/context/AuthContext';

type QuizSummary = {
  id: string;
  topic: string;
  segments: number;
  mcqs: number;
};

export default function Home() {
  const { role } = useAuth();
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch('http://localhost:3000/video/quizzes');
        const data = await res.json();
        setQuizzes(data);
      } catch (err) {
        console.error('Failed to fetch quizzes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Available Quizzes</h1>
          {role === 'admin' && (
            <Button asChild>
              <a href="/create">Create Quiz</a>
            </Button>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search quizzes..."
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-gray-600 dark:text-gray-300">Loading quizzes...</p>
        ) : filteredQuizzes.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No quizzes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} {...quiz} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
