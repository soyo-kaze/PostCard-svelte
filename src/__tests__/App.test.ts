/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from "@testing-library/svelte";

import App from "../App.svelte";
import { imgSrcStore } from "../store";
let PosterComponent;

// Expected value of Rotation and scaling tests
let updatedRotationValue = 0;
let updatedScaleValue = 1;

imgSrcStore.subscribe((value) => {
  // Subscription to the store so every time we update value we can test against the expected value
  expect(value.rotate).toBe(updatedRotationValue);
  expect(value.scale).toBe(updatedScaleValue);
});

describe("Testing Actions", () => {
  beforeEach(() => {
    PosterComponent = render(App, {}); // Runs before each test to render the App so testing components can be referenced
  });

  test("Poster Panel Exists", async () => {
    let components = await PosterComponent.findByTestId("post__card");
    expect(components).not.toBeNull();
  });

  test("Remove text function", async () => {
    let removeBtn = await PosterComponent.findByTestId("remove__text");
    await fireEvent.click(removeBtn);

    let text = await PosterComponent.findByTestId("text");
    expect(text.hidden).toBeTruthy();
  });

  test("Add text function", async () => {
    let addBtn = await PosterComponent.findByTestId("add__text");
    await fireEvent.click(addBtn);

    let text = await PosterComponent.findByTestId("text");
    expect(text.hidden).toBeFalsy();
  });

  test("Rotation left", async () => {
    let rotateLeftBtn = await PosterComponent.findByTestId("rotate__left");
    /**
     * Update the expected value before we fire the event so we can test against the stores value that'll be
     * fired immediately after the click event since it updates the store which triggers subscribed block of code.
     */
    updatedRotationValue = -90;
    await fireEvent.click(rotateLeftBtn);
  });

  test("Rotation right", async () => {
    let rotateRightBtn = await PosterComponent.findByTestId("rotate__right");
    updatedRotationValue = 0;
    await fireEvent.click(rotateRightBtn);
  });

  test("Scale up", async () => {
    let scaleUp = await PosterComponent.findByTestId("scale__up");
    updatedScaleValue = 1.25;
    await fireEvent.click(scaleUp);
  });

  test("Scale up", async () => {
    let scaleDown = await PosterComponent.findByTestId("scale__down");
    updatedScaleValue = 1;
    await fireEvent.click(scaleDown);
  });
});
