import { writable } from "svelte/store";

export interface imgProp {
  imgSrc: string;
  rotate: number;
  scale: number;
  key: symbol;
  active: boolean;
  text?: {
    hidden: boolean;
    data: string;
    X?: number;
    Y?: number;
  };
  undoStack?: Array<imgProp>;
  redoStack?: Array<imgProp>;
}

let key = Symbol();
export const switchCardInitialValue: imgProp = {
  imgSrc: "/assets/post.jpg",
  rotate: 0,
  scale: 1,
  key,
  active: true,
  text: {
    hidden: false,
    data: "Basic Data",
    X: 100,
    Y: 100,
  },
  undoStack: [],
  redoStack: [],
};

let postCards: Array<imgProp> = [switchCardInitialValue];

// Implemented 2 stores to avoid main postcard Re-rendering.
export let imgSrcStore = writable(switchCardInitialValue);
export let postCardStore = writable(postCards);
