'use client';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import SegmentBlock from '@/components/quiz/SegmentBlock';

type Segment = {
  segment: string;
  mcqs: string[];
};

type QuizDetailsType = {
  _id: string;
  filename: string;
  transcript: string;
  mcqResults: Segment[];
};

export default function QuizDetails() {
  const { id } = useParams();
  const { role } = useAuth();

  const [quizDetails, setQuizDetails] = useState<QuizDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchQuizDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3000/video/quiz/${id}`);
        if (!res.ok) throw new Error('Failed to fetch quiz details');
        const data = await res.json();
        setQuizDetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [id]);

  if (loading) return <p className="p-6">Loading quiz details...</p>;
  if (!quizDetails) return <p className="p-6">Quiz not found</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Quiz: {quizDetails.filename}</h2>

      {quizDetails.mcqResults?.map((seg, idx) => (
        <SegmentBlock
          key={idx}
          editable={role === 'admin'}
          id={idx}
          title={`Segment ${idx + 1}`}
          description={seg.segment}
          mcqs={seg.mcqs}
        />
      ))}

      {role === 'admin' && (
        <div className="mt-6">
          <Button>Export JSON</Button>
        </div>
      )}
    </div>
  );
}
