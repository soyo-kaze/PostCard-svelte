import { writable } from "svelte/store";

export interface imgProp {
  imgSrc: string;
  rotate: `${number}deg`;
  scale: number;
  key?: symbol;
  opacity?: string;
  maxWidth?: string;
  active: boolean;
}

let key = Symbol();

export const switchCardInitialValue: imgProp = {
  imgSrc: "/assets/post.jpg",
  rotate: "90deg",
  scale: 0.55,
  key,
  active: true,
};

let postCards: Array<imgProp> = [switchCardInitialValue];

// Implemented 2 stores to avoid main postcard Re-rendering.
export let imgSrcStore = writable(switchCardInitialValue);
export let postCardStore = writable(postCards);
