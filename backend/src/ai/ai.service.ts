import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import * as fs from 'fs';

@Injectable()
export class AIService {
  async transcribe(filePath: string): Promise<string> {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    const response = await axios.post('http://localhost:8000/transcribe', form, {
      headers: form.getHeaders(),
    });

    return response.data.transcript;
  }

  async generateMCQs(segment: string): Promise<any[]> {
    const response = await axios.post('http://localhost:8000/generate-mcq', {
      segment,
    });

    return response.data.questions;
  }
}
