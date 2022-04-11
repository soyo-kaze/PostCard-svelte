import {
  imgProp,
  switchCardInitialValue,
  imgSrcStore,
  postCardStore,
} from "../../store";

let switchCard = switchCardInitialValue;

/**
 * It uses FileReader to read the file uploaded via file-type input tag and changes
 * the image file to base64 string so it can be used in img tag as a source.
 * @summary This Function is to upload and add image.
 * @param {Event} e - It takes in an eventObject.
 */

export const handleUpload = (e: Event): void => {
  // Typescript doesn't know about the type of this element so we assert it to the one we are confident about <HTMLInputElement>
  const image = document.querySelector("input[type=file]") as HTMLInputElement;

  const file = image.files[0];

  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      // Convert image file to base64 string
      let imgBase64 = reader.result;
      let imgSrcInner = imgBase64 as string;

      let key = Symbol();

      // Add multiple images to postCards array
      postCardStore.update((e) => [
        ...e,
        {
          imgSrc: imgSrcInner,
          rotate: 0,
          scale: 1,
          key,
          active: false,
        },
      ]);
    });
    reader.readAsDataURL(file);
  }
};

/**
 * We can change image from the small carousel to postCard panel where actions can be seen and updated.
 * @summary switch between different postcards uploaded.
 * @param {Event} e - Event Object.
 * @param {imgProp} card - imgProp object contianing img data.
 */

export const handleCard = (e: Event, card: imgProp) => {
  if (card.key === switchCard.key) return;

  // Change style as per active tile and changes `active` state
  postCardStore.update((e) =>
    e.map((element: imgProp) =>
      element.key === card.key
        ? { ...element, active: true }
        : { ...element, active: false }
    )
  );
  switchCard = card;
  imgSrcStore.set(switchCard);
};
