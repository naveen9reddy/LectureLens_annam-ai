import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "../ui/checkbox";  // Import Checkbox component

interface SegmentProps {
  id: number;
  title: string;
  description:string;
  mcqs: string[];  // Array of MCQs (questions)
  editable: boolean;
}

export default function SegmentBlock({ id, title,description, mcqs, editable }: SegmentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(mcqs.join("\n"));

  // To handle option selection (Checkboxes for each question)
  const [selectedOptions, setSelectedOptions] = useState<Set<number>>(new Set());

  const handleCheckboxChange = (questionIndex: number) => {
    const updatedSelection = new Set(selectedOptions);
    if (updatedSelection.has(questionIndex)) {
      updatedSelection.delete(questionIndex);
    } else {
      updatedSelection.add(questionIndex);
    }
    setSelectedOptions(updatedSelection);
  };

  return (
    <div className="mb-6">
      <hr className="my-4" />
      <h3 className="text-lg font-medium">{title}</h3>
      <p  className="">{description}</p>

      {editable && isEditing ? (
        <>
          <Textarea
            className="mt-2"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="mt-2 flex gap-2">
            <Button onClick={() => setIsEditing(false)}>Done</Button>
            <Button variant="outline" onClick={() => setContent(mcqs.join("\n"))}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="mt-4">
            {content.split("\n").map((question, index) => (
              <div key={index} className="mb-4">
                <div className="font-semibold">{question}</div>
                <div className="space-y-2">
                  {['A', 'B', 'C', 'D'].map((option, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedOptions.has(index)}
                        onChange={() => handleCheckboxChange(index)}
                        disabled={!editable}  // Disable checkboxes for non-editable users
                      />
                      <label className="cursor-pointer">{`${option}.) Option ${i + 1}`}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {editable && (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              Edit Segment
            </Button>
          )}
        </>
      )}
    </div>
  );
}
