<script setup lang="ts">
import SideBar from './components/SideBar.vue'
import MainContent from './components/MainContent.vue'
import { provide, ref, type Ref } from 'vue'
import { nanoid } from 'nanoid'
import { saveNoteKey } from './injectionKey'

// interfaces
interface Note {
  id: string
  title: string
  content: string
  date: string
  bgColor: string
}

// local refs
let cardColor: Ref<string> = ref('')

const notes: Ref<Note[]> = ref([
  {
    id: nanoid(),
    title: 'Note Title',
    content: 'Note Content',
    date: new Date().toLocaleDateString(),
    bgColor: 'bg-slate-200'
  }
])

// functions
const selectColorHandler = (color: string) => {
  notes.value.unshift({
    id: nanoid(),
    title: '',
    content: '',
    date: new Date().toLocaleDateString(),
    bgColor: color
  })

  localStorage.setItem('notes', JSON.stringify(notes.value))
}

const deleteNote = (noteId: string) => {
  notes.value = notes.value.filter((note) => note.id !== noteId)
  localStorage.setItem('notes', JSON.stringify(notes.value))
}

const saveNote = (noteId: string, newTitle: string, newContent: string) => {
  const index = notes.value.findIndex((note) => note.id === noteId)
  if (index !== -1) {
    let previousNote = notes.value[index]
    notes.value[index] = {
      ...previousNote,
      title: newTitle,
      content: newContent,
      date: new Date().toLocaleDateString()
    }
    localStorage.setItem('notes', JSON.stringify(notes.value))
  } else {
    console.log(`NOte with id ${noteId} not found.`)
  }
}

// Provide updateNote function
provide(saveNoteKey, saveNote)

// logics
let storedNotes = localStorage.getItem('notes')

if (storedNotes) {
  notes.value = JSON.parse(storedNotes) as Note[]
}
</script>

<template>
  <div class="bg-slate-200 w-full min-h-screen flex justify-center p-16">
    <div class="flex w-full h-full bg-white rounded-xl shadow-md">
      <SideBar v-model:cardColor="cardColor" @selectColor="selectColorHandler" />
      <MainContent :notes="notes" @deleteNote="deleteNote" />
    </div>
  </div>
</template>
