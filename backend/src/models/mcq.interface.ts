export interface MCQ {
    question: string;
    options: string[];
    answer: string;
  }
  
  export interface MCQResult {
    segment: string;
    mcqs: MCQ[];
  }

  export interface TranscriptSegment {
    start: number;
    end: number;
    text: string;
  }
  
  export interface TranscriptResult {
    fullText: string;
    segments: TranscriptSegment[];
  }
  