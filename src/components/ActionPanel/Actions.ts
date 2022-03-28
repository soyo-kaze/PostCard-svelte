import { imgProp, imgSrcStore, postCardStore } from "../../store";

/**
 * This function is used to scale up or down size of the postcard currently loaded on the panel.
 * It updates the states of the current postcard via the updating svelte/store defined in `./store.ts`,
 * it achieves the same by updating the value of scale inside the two stores created i.e. `imgSrcStore` and `postCardStore`
 * @summary Updates the size of postCard i.e. scaleUp and scaleDown
 * @param {symbol} key - To specify the current postcard loaded on the panel
 * @param {number} scale - The amount of steps by which we want to scale up or down at a time
 */

export const scalePoster = (key: any, scale: number) => {
  imgSrcStore.update((value) => {
    // If scaling goes below 0.25 stop decreasing
    if (value.scale + scale == 0) return value;

    // else update postCardStore contain all the cards with the our updated card
    postCardStore.update((e) =>
      e.map((element: imgProp) =>
        element.key === key
          ? { ...element, scale: element.scale + scale, undoStack: element }
          : element
      )
    );
    return { ...value, scale: value.scale + scale, undoStack: value };
  });
};

/**
 * @summary - Similar to scalePoster instead it updates the angle by which poster is rotated.
 * @param {symbol} key - To specify the current postcard loaded on the panel.
 * @param {number} rotation - The amount of steps by which we want to scale up or down at a time
 */

export const rotatePoster = (key: any, rotation: number) => {
  imgSrcStore.update((value) => {
    // else update postCardStore contain all the cards with the our updated card
    postCardStore.update((e) =>
      e.map((element: imgProp) =>
        element.key === key
          ? {
              ...element,
              rotate: (element.rotate + rotation) % 360,
              undoStack: element,
            }
          : element
      )
    );
    return {
      ...value,
      rotate: (value.rotate + rotation) % 360,
      undoStack: value,
    };
  });
};

/**
 * @todo Add comments for functions.
 * @todo Refactor code if needed.
 */

export const undo = () => {
  imgSrcStore.update((state) => ({ ...state.undoStack, redoStack: state }));
};

export const redo = () => {
  imgSrcStore.update((state) => ({ ...state.redoStack, undoStack: state }));
};

export const addText = () => {
  imgSrcStore.update((value) => {
    postCardStore.update((e) =>
      e.map((element: imgProp) =>
        element.key === value.key
          ? {
              ...element,
              text: {
                ...element.text,
                hidden: false,
                data: "Hello World",
                X: 100,
                Y: 100,
              },
              undoStack: element,
            }
          : element
      )
    );
    return {
      ...value,
      text: {
        ...value.text,
        hidden: false,
        data: "Hello World",
        X: 100,
        Y: 100,
      },
      undoStack: value,
    };
  });
};

export const removeText = () => {
  imgSrcStore.update((value) => {
    postCardStore.update((e) =>
      e.map((element: imgProp) =>
        element.key === value.key
          ? {
              ...element,
              text: {
                ...element.text,
                hidden: true,
              },
              undoStack: element,
            }
          : element
      )
    );
    return {
      ...value,
      text: {
        ...value.text,
        hidden: true,
      },
      undoStack: value,
    };
  });
};
