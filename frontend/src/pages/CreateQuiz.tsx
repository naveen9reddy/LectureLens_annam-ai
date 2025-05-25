import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type UploadStatus =
  | "idle"
  | "uploading"
  | "segmenting"
  | "generating_mcqs"
  | "success"
  | "error";

export default function CreateQuiz() {
  const [topic, setTopic] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const validate = () => {
    if (!topic.trim()) {
      setError("Topic is required");
      return false;
    }
    if (!file) {
      setError("Please upload an MP4 video file");
      return false;
    }
    if (file.type !== "video/mp4") {
      setError("Only MP4 video files are allowed");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setStatus("uploading");
    setError(null);

    try {
      const formData = new FormData();
if (file) {
  formData.append("file", file);
} else {
  setError("File is missing");
  setStatus("idle");
  return;
}


      // 1. Upload video
      const uploadRes = await fetch("http://localhost:3000/video/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload video");
      }

      // simulate step for segmentation
      setStatus("segmenting");
      // Optionally wait or get progress info if API supports it

      // simulate step for MCQ generation
      setStatus("generating_mcqs");
      // Optionally wait or get progress info if API supports it

      const data = await uploadRes.json();

      if (data?.message !== "Video uploaded and processed successfully") {
        throw new Error("Processing failed on server");
      }

      setStatus("success");

      // Redirect after short delay to show success
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Failed to upload video, try again later.");
    }
  };

  const renderStatusMessage = () => {
    switch (status) {
      case "uploading":
        return "Uploading video...";
      case "segmenting":
        return "Segmenting video...";
      case "generating_mcqs":
        return "Generating MCQs...";
      case "success":
        return "Upload successful! Redirecting...";
      case "error":
        return `Upload failed: ${error}`;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create New Quiz</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="topic">Topic <span className="text-red-500">*</span></Label>
          <Input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={status !== "idle"}
            placeholder="Enter quiz topic"
          />
        </div>

        <div>
          <Label htmlFor="file">Upload MP4 <span className="text-red-500">*</span></Label>
          <Input
            id="file"
            type="file"
            accept="video/mp4"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            disabled={status !== "idle"}
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <Button
          className="mt-4"
          onClick={handleSubmit}
          disabled={status !== "idle"}
        >
          Generate
        </Button>

        {status !== "idle" && (
          <p className="mt-4 font-medium text-blue-700">{renderStatusMessage()}</p>
        )}
      </div>
    </div>
  );
}
