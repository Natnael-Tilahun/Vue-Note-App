<script lang="ts" setup>
import { computed, ref, type Ref } from 'vue'
import NoteCard from './NoteCard.vue'

// local variables
let filteredNotes: any

// local refs
const searchValue: Ref<string> = ref('')

// props
const props = defineProps<{
  notes: {
    id: string
    title: string
    content: string
    date: string
    bgColor: string
  }[]
}>()

// emits
const emit = defineEmits(['deleteNote'])

// functions
const deleteNoteHandler = (id: string) => {
  emit('deleteNote', id)
}

const filterNotesHandler = computed(() => {
  filteredNotes = props.notes.filter((note) =>
    note.title.toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase())
  )
  return filteredNotes
})
</script>

<template>
  <div class="p-4 md:px-10 md:py-5 w-full flex flex-col gap-5 md:gap-10">
    <input
      type="text"
      class="border-[1px] shadow-sm rounded-md w-full md:w-1/2 p-2 md:p-3"
      placeholder="search by note title"
      v-model="searchValue"
    />
    <div class="w-full">
      <h1 class="md:text-2xl font-medium pb-3 md:pb-10">Notes</h1>
      <div
        v-if="!searchValue"
        class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
      >
        <NoteCard
          v-for="note in notes"
          :key="note.id"
          :note="note"
          :class="[note.bgColor]"
          @deleteNoteHandler="deleteNoteHandler"
        />
      </div>
      <div
        v-else
        class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
      >
        <NoteCard
          v-for="note in filterNotesHandler"
          :key="note.id"
          :note="note"
          :class="[note.bgColor]"
          @deleteNoteHandler="deleteNoteHandler"
        />
      </div>
    </div>
  </div>
</template>
