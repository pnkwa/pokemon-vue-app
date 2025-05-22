<script setup lang="ts">
import { ref, watch } from "vue";

export type TypeOption = {
  label: string;
  value: number;
  color: string;
};

const props = defineProps<{
  type: TypeOption | null;
}>();

const emit = defineEmits<{
  (e: "update:type", value: TypeOption | null): void;
}>();

const modelSingle = ref<TypeOption | null>(props.type);

watch(modelSingle, (val) => {
  emit("update:type", val);
});

watch(
  () => props.type,
  (val) => {
    modelSingle.value = val;
  }
);

const options: TypeOption[] = [
  { label: "Normal", value: 1, color: "grey" },
  { label: "Fighting", value: 2, color: "deep-orange" },
  { label: "Flying", value: 3, color: "light-blue" },
  { label: "Poison", value: 4, color: "purple" },
  { label: "Ground", value: 5, color: "brown" },
  { label: "Rock", value: 6, color: "grey" },
  { label: "Bug", value: 7, color: "lime" },
  { label: "Ghost", value: 8, color: "deep-purple" },
  { label: "Steel", value: 9, color: "blue-grey" },
  { label: "Fire", value: 10, color: "red" },
  { label: "Water", value: 11, color: "blue" },
  { label: "Grass", value: 12, color: "green" },
  { label: "Electric", value: 13, color: "yellow" },
  { label: "Psychic", value: 14, color: "pink" },
  { label: "Ice", value: 15, color: "light-blue" },
  { label: "Dragon", value: 16, color: "indigo" },
  { label: "Dark", value: 17, color: "black" },
  { label: "Fairy", value: 18, color: "pink" },
];
</script>

<template>
  <div class="q-pa-md q-mb-md">
    <q-select
      filled
      v-model="modelSingle"
      :options="options"
      use-chips
      stack-label
      label="Filter by Type"
      :option-label="(opt) => opt.label"
      :option-value="(opt) => opt.value"
      :option-slot="true"
    >
      <template v-slot:option="scope">
        <q-item clickable v-ripple @click="scope.toggleOption(scope.opt)">
          <q-item-section avatar>
            <q-icon
              name="fiber_manual_record"
              :color="scope.opt.color"
              size="18px"
            />
          </q-item-section>
          <q-item-section>{{ scope.opt.label }}</q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>
