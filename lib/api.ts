interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

function getHeaders(): Record<string, string> {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = "",
  tag,
}: FetchNotesParams = {}) {
  const params = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });

  if (search) {
    params.append("search", search);
  }

  if (tag && tag.toLowerCase() !== "all") {
    params.append("tag", tag);
  }

  const response = await fetch(
    `https://notehub-public.goit.study/api/notes?${params.toString()}`,
    {
      headers: getHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Could not fetch the list of notes.");
  }

  return response.json();
}

export async function fetchNoteById(id: string) {
  const response = await fetch(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: getHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Could not fetch note details.");
  }

  return response.json();
}

export async function createNote(data: CreateNoteData) {
  const response = await fetch("https://notehub-public.goit.study/api/notes", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create note.");
  }

  return response.json();
}

export async function deleteNote(id: string) {
  const response = await fetch(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete note.");
  }

  return response.json();
}
export type CreateNotePayload = CreateNoteData;
