import { Note, NewNote } from "@/types/note";
import { User } from "@/types/user";
import { api, Credentials, FetchNotesProps, FetchNotesResponse } from "./api";

export const register = async (creds: Credentials) => {
  const { data } = await api.post<User>("/auth/register", creds);
  return data;
};

export const login = async (creds: Credentials) => {
  const { data } = await api.post<User>("/auth/login", creds);
  return data;
};

export const logout = async () => {
  const { data } = await api.post<{ message: string }>("/auth/logout");

  return data;
};

export const checkSession = async () => {
  const { data } = await api.get<{ success: boolean }>("/auth/session");
  return data.success;
};

export const fetchUser = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const fetchNotes = async ({
  page,
  searchText,
  tag,
}: FetchNotesProps) => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      search: searchText,
      page,
      perPage: 12,
      ...(tag !== "" ? { tag } : {}),
    },
  });
  return response.data;
};

export const createNote = async (newNote: NewNote) => {
  const response = await api.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const response = await api.get<Note>(`/notes/${noteId}`);
  return response.data;
};
