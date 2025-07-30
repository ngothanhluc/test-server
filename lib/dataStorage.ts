import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export interface RequestData {
  id: string
  timestamp: string
  method: string
  endpoint: string
  headers: Record<string, string>
  body: unknown
  ip?: string
  userAgent?: string
}

export async function saveRequest(data: Omit<RequestData, 'id' | 'timestamp'>): Promise<RequestData> {
  // Ensure data directory exists
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }

  const requestData: RequestData = {
    ...data,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  };

  const filePath = path.join(DATA_DIR, `${requestData.id}.json`);
  await fs.writeFile(filePath, JSON.stringify(requestData, null, 2));

  return requestData;
}

export async function getAllRequests(): Promise<RequestData[]> {
  try {
    await fs.access(DATA_DIR);
  } catch {
    return [];
  }

  const files = await fs.readdir(DATA_DIR);
  const jsonFiles = files.filter(file => file.endsWith('.json'));
  const requests = await Promise.all(
    jsonFiles.map(async file => {
      const filePath = path.join(DATA_DIR, file);
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        const parsedData = JSON.parse(content);
        // Validate that the parsed data has the required structure
        if (parsedData && typeof parsedData === 'object' && 'id' in parsedData && 'timestamp' in parsedData) {
          return parsedData;
        }
        return null;
      } catch {
        // Return null for corrupted files to be filtered out
        return null;
      }
    }),
  );

  // Filter out null values and sort by timestamp descending
  return requests
    .filter((request): request is RequestData => request !== null)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function getRequestById(id: string): Promise<RequestData | null> {
  try {
    const filePath = path.join(DATA_DIR, `${id}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export async function deleteRequest(id: string): Promise<boolean> {
  try {
    const filePath = path.join(DATA_DIR, `${id}.json`);
    await fs.unlink(filePath);
    return true;
  } catch {
    return false;
  }
}
