import type { InjectionKey } from 'vue'

// injection types
export const saveNoteKey: InjectionKey<
  (noteId: string, noteTitle: string, noteContent: string) => void
> = Symbol('saveNote')
