import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  topic: string;
  segments: number;
  mcqs: number;
}

export default function QuizCard({ id, topic, segments, mcqs }: Props) {
  const navigate = useNavigate();

  return (
    <Card className="cursor-pointer hover:shadow-lg" onClick={() => navigate(`/quiz/${id}`)}>
      <CardHeader>
        <CardTitle>{topic}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{segments} Segments</p>
        <p>{mcqs} MCQs</p>
      </CardContent>
    </Card>
  );
}
