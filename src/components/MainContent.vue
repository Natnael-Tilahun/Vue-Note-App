<script lang="ts" setup>
import NoteCard from './NoteCard.vue'

// props
const props = defineProps<{
  notes: {
    id: string
    title: string
    content: string
    date: Date
    bgColor: string
  }[]
}>()
console.log('notesss', props.notes)

// emits
const emit = defineEmits(['deleteNote'])

// methods
const deleteNoteHandler = (id: string) => {
  emit('deleteNote', id)
}
</script>

<template>
  <div class="p-4 md:px-10 md:py-5 w-full flex flex-col gap-5 md:gap-10">
    <input
      type="text"
      class="border-[1px] shadow-sm rounded-md w-full md:w-1/2 p-2 md:p-3"
      placeholder="search"
    />
    <div class="w-full">
      <h1 class="md:text-2xl font-medium pb-3 md:pb-10">Notes</h1>
      <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        <NoteCard
          v-for="note in notes"
          :key="note.id"
          :note="note"
          :class="[note.bgColor]"
          @deleteNoteHandler="deleteNoteHandler"
        />
      </div>
    </div>
  </div>
</template>
