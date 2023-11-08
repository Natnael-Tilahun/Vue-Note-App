<script lang="ts" setup>
import { saveNoteKey } from '@/injectionKey'
import { inject, ref } from 'vue'

// props
const props = defineProps<{
  note: {
    id: string
    title: string
    content: string
    date: string
  }
}>()

// local refs
const notes = ref({
  title: props.note.title,
  content: props.note.content,
  date: new Date().toLocaleDateString()
})

// emits
const emit = defineEmits(['update:note.title', 'deleteNoteHandler'])

// functions
const deleteNote = (id: string) => {
  emit('deleteNoteHandler', id)
}

// Expose the function to the template
const saveNoteFromChild = (id: string, title: string, content: string) => {
  if (saveNote) {
    saveNote(id, title, content)
  }
}

// Inject the provided updateNote function
const saveNote = inject(saveNoteKey)
</script>

<template>
  <div
    v-bind="$attrs"
    class="rounded-xl min-h-[250px] w-auto shadow-sm p-5 flex flex-col gap-3 justify-between"
  >
    <div class="space-y-4">
      <div class="flex w-full justify-between items-center">
        <input
          class="text-lg font-medium bg-inherit w-full h-fit focus:border-none outline-none placeholder:text-stone-700"
          placeholder="Note title here"
          v-model="notes.title"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          @click="($event) => saveNoteFromChild(note.id, notes.title, notes.content)"
          class="w-9 h-9 fill-green-400 bg-black rounded-full p-2"
        >
          <path
            d="M5 5V19H19V7.82843L16.1716 5H5ZM4 3H17L20.7071 6.70711C20.8946 6.89464 21 7.149 21 7.41421V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM12 18C10.3431 18 9 16.6569 9 15C9 13.3431 10.3431 12 12 12C13.6569 12 15 13.3431 15 15C15 16.6569 13.6569 18 12 18ZM6 6H15V10H6V6Z"
          ></path>
        </svg>
      </div>
      <textarea
        class="text-sm w-full h-[180px] bg-inherit focus:border-none outline-none placeholder:text-stone-500"
        v-model="notes.content"
        placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem excepturi eaque, repellat, recusandae modi culpa quidem repudiandae unde corrupti quasi provident illo doloribus minima, molestiae inventore accusantium odio odit libero!"
      ></textarea>
    </div>

    <div class="flex w-full justify-between items-center">
      <p class="text-gray-700 text-sm">{{ note.date }}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-9 h-9 fill-white bg-black rounded-full p-2"
        viewBox="0 0 24 24"
        @click="deleteNote(note.id)"
      >
        <path
          d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9ZM9 12V18H11V12H9ZM13 12V18H15V12H13Z"
        ></path>
      </svg>
    </div>
  </div>
</template>
