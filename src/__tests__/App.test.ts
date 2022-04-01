/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from "@testing-library/svelte";

import App from "../App.svelte";

test.todo("Write some tests");

test("some test", () => {
  const compo = render(App, {});

  expect(compo).not.toBeNull();
});
