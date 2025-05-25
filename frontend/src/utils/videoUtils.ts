export async function validateVideoDuration(file: File): Promise<boolean> {
    const video = document.createElement('video');
    const duration = await new Promise<number>((resolve, reject) => {
      video.onloadedmetadata = () => resolve(video.duration);
      video.onerror = reject;
      video.src = URL.createObjectURL(file);
    });
    return duration <= 3600; // 60 minutes in seconds
  }
  