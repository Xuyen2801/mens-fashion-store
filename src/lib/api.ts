export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchCollection<T>(collectionName: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/api/${collectionName}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${collectionName}: ${response.status}`);
  }

  return response.json();
}