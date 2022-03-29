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

/**
 * Used to implement undo functionality by tracking immediate states before and after change, it loads the state that
 * is stored in undoStack property of the state and saves the current state to redoStack property.
 * @summary This function tracks the immediate last state and assign it to the undoStack property of the postcards state
 */

export const undo = () => {
  imgSrcStore.update((state) => {
    postCardStore.update((e) =>
      e.map((element: imgProp) =>
        element.key === state.key
          ? {
              ...element.undoStack,
              redoStack: element,
            }
          : element
      )
    );
    return { ...state.undoStack, redoStack: state };
  });
};

/**
 * It does exactly what undo function does but instead of loading from undoStack and saving in
 * redoStack it does exactly the opposite it loads state from redoStack and saves the current state
 * to undoStack. And that folks how we do undo/redo without tracking a stack.
 * @summary Similar to undo function but instead it tracks the state before the undo that is redo
 */
export const redo = () => {
  imgSrcStore.update((state) => {
    postCardStore.update((e) =>
      e.map((element: imgProp) =>
        element.key === state.key
          ? {
              ...element.redoStack,
              undoStack: element,
            }
          : element
      )
    );
    return { ...state.redoStack, undoStack: state };
  });
};

/**
 * It negates the hidden property of the text property that targets the movable text component
 * on the postcard and add some boilerplate-ish properties
 */

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

/**
 * Hides the movable text component by making the hidden property true
 */

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
