import { QWERTY_LAYOUT } from "./layouts/qwerty";

export enum KeyboardLayout {
  QWERTY = "qwerty",
}

export const layouts = {
  [KeyboardLayout.QWERTY]: QWERTY_LAYOUT,
};
