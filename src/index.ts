import NesVue from "@/components/NesVue.vue";
import { nes } from "@/nes";
import { vGamepad } from "@/directives/v-gamepad";

export type NesVueInstance = InstanceType<typeof NesVue>;
export type {
  Controller,
  NesVueProps,
  EmitErrorObj,
  SavedOrLoaded,
} from "src/types";
export { NesVue, nes, vGamepad };
