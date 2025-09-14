import { Note } from "@/types/note";
import { User } from "@/types/user";
import { api, FetchNotesProps, FetchNotesResponse } from "./api";
import { cookies } from "next/headers";

export const checkSession = async () => {
  const cookieStore = await cookies();
  const response = await api.get<{ success: boolean }>("auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};

// users

export const fetchUser = async () => {
  const cookieStore = await cookies();
  const { data } = await api.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNotes = async ({
  page,
  searchText,
  tag,
}: FetchNotesProps) => {
  const cookieStore = await cookies();
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      search: searchText,
      page,
      perPage: 12,
      ...(tag !== "" ? { tag } : {}),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const cookieStore = await cookies();
  const response = await api.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};
