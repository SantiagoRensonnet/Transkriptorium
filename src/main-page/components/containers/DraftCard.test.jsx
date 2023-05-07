import { describe, test, expect, vi } from "vitest";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render, screen, prettyDOM, fireEvent } from "@testing-library/react";
import { DraftCard } from "./DraftCard.component";

describe("<DraftCard />", () => {
  test("renders card with available resources", () => {
    const draftValidData = {
      name: "Albatross",
      fileId: "Albatross_vol009of055-050-0",
    };
    const draftCardComponent = render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<DraftCard draft={draftValidData} />} />
        </Routes>
      </BrowserRouter>
    );
    // const img = draftCardComponent.container.querySelector("img");
    // console.log(prettyDOM(img));
    expect(draftCardComponent.getByText(draftValidData.name));
    // expect(draftCardComponent.container).toHaveTextContent(draftData.name);
  });
  test("renders 404 error card when the server cannot find the requested resource", () => {
    const draftInvalidData = {
      name: "some draft",
      fileId: "some_id_001",
    };
    const draftCardComponent = render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<DraftCard draft={draftInvalidData} />} />
        </Routes>
      </BrowserRouter>
    );
    expect(draftCardComponent.getByText("404"));
    expect(draftCardComponent.container).toHaveTextContent(
      draftInvalidData.name
    );
    // expect(screen.getByText(draftInvalidData.name));
    // expect(draftCardComponent.getByText(draftInvalidData.name));
  });
  test("clicking the button calls event handler once", () => {
    const draftValidData = {
      name: "Albatross",
      fileId: "Albatross_vol009of055-050-0",
    };

    const mockHandler = vi.fn();

    const draftCardComponent = render(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <DraftCard
                draft={draftValidData}
                setSelectedDraft={mockHandler}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );

    // fireEvent.click(draftCardComponent.getByRole("link"));
    const cardContainer = draftCardComponent.container.querySelector("article");
    // console.log(prettyDOM(cardContainer));
    fireEvent.click(cardContainer);
    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});
