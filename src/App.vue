<script setup lang="ts">
import SideBar from './components/SideBar.vue'
import MainContent from './components/MainContent.vue'
import { ref, type Ref } from 'vue'
import { nanoid } from 'nanoid'

// interfaces
interface Note {
  id: string
  title: string
  content: string
  date: Date
  bgColor: string
}

// local refs
let cardColor: Ref<string> = ref('')

const notes: Ref<Note[]> = ref([
  {
    id: nanoid(),
    title: 'Note Title',
    content: 'Note Content',
    date: new Date(),
    bgColor: 'bg-slate-200'
  }
])

let storedNotes = localStorage.getItem('notes')

if (storedNotes) {
  notes.value = JSON.parse(storedNotes) as Note[]
}

const selectColorHandler = (color: string) => {
  // alert(color)
  notes.value.unshift({
    id: nanoid(),
    title: 'Note Title',
    content: 'Note Content',
    date: new Date(),
    bgColor: color
  })

  localStorage.setItem('notes', JSON.stringify(notes.value))
}

const deleteNote = (noteId: string) => {
  notes.value = notes.value.filter((note) => note.id !== noteId)
  localStorage.setItem('notes', JSON.stringify(notes.value))
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
