<script lang="ts" setup>
import { ref, type Ref } from 'vue'

// local refs
const isCollapsed: Ref<boolean> = ref(true)

// local variables
const colors = [
  'bg-blue-300',
  'bg-orange-400',
  'bg-green-400',
  'bg-red-400',
  'bg-slate-400',
  'bg-amber-400',
  'bg-cyan-400',
  'bg-indigo-400',
  'bg-purple-400',
  'bg-fuchsia-400'
]

// props
defineProps<{
  cardColor: string
}>()

// emits
const emit = defineEmits(['update:cardColor', 'selectColor'])
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

// methods
const selectCardColor = (color: string) => {
  //   emit('update:cardColor', color)
  emit('selectColor', color)
}
</script>

<template>
  <div class="w-10 md:w-36 border-r-2 min-h-screen p-5 flex flex-col items-center gap-14">
    <h1 class="text-xs md:text-xl font-bold">Note App</h1>
    <div @click="toggleCollapse">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-12 md:h-12" viewBox="0 0 24 24">
        <path
          d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"
        ></path>
      </svg>
    </div>
    <div v-if="isCollapsed" class="h-full">
      <ul class="flex flex-col gap-6" v-for="(color, index) in colors" :key="index">
        <li @click="selectCardColor(color)" class="w-6 h-6 rounded-full my-3" :class="color"></li>
      </ul>
    </div>
  </div>
</template>
