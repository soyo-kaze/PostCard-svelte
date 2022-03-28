import { imgProp, imgSrcStore, postCardStore } from "../../store";

/**
 * @todo Write comments
 * @todo Refactor code if needed
 */

function handleEdit(e: Event) {
  let { target } = e;
  imgSrcStore.update((value) => {
    postCardStore.update((e) =>
      e.map((element: imgProp) =>
        element.key === value.key
          ? {
              ...element,
              text: {
                ...element.text,
                data: (target as HTMLDivElement).innerText,
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
        data: (target as HTMLDivElement).innerText,
      },
      undoStack: value,
    };
  });
}

const mouseMove = (event: MouseEvent) => {
  imgSrcStore.update((value) => {
    postCardStore.update((e) =>
      e.map((element: imgProp) =>
        element.key === value.key
          ? {
              ...element,
              text: {
                ...element.text,
                X: event.offsetX,
                Y: event.offsetY,
              },
            }
          : element
      )
    );
    return {
      ...value,
      text: {
        ...value.text,
        X: event.offsetX,
        Y: event.offsetY,
      },
    };
  });
};

function handleMove(e: Event) {
  document.body.addEventListener("mouseup", () =>
    document
      .querySelector(".post__card")
      .removeEventListener("mousemove", mouseMove)
  );
  document
    .querySelector(".post__card")
    .addEventListener("mousemove", mouseMove);
}

export { handleEdit, handleMove, mouseMove };
