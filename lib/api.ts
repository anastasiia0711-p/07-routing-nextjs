import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api/notes";

const getAuthHeaders = () => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

export const fetchNotes = async (
  params: FetchNotesParams = {},
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(API_URL, {
    ...getAuthHeaders(),
    params: {
      page: params.page || 1,
      perPage: params.perPage || 12,
      ...(params.search && { search: params.search }),
      // Додаємо тег до параметрів запиту, якщо він переданий і не порожній
      ...(params.tag && params.tag !== "all" && { tag: params.tag }),
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (newNote: CreateNotePayload): Promise<Note> => {
  const response = await axios.post<Note>(API_URL, newNote, getAuthHeaders());
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(
    `${API_URL}/${id}`,
    getAuthHeaders(),
  );
  return response.data;
};
