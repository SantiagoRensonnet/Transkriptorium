import { useState } from "react";
import { DraftCard } from "../main-page/components/containers/DraftCard.component";
export const Home = () => {
  const [selectedDraft, setSelectedDraft] = useState("");
  const draftsData = [
    { name: "Albatross", fileId: "Albatross_vol009of055-050-0" },
  ];

  return (
    <main className="main-container" onClick={() => setSelectedDraft("")}>
      <section
        className={
          draftsData.length > 6 ? "draft-list sm:mb-20 sm:mt-4" : "draft-list"
        }
      >
        {draftsData.map((draftData, index) => (
          <DraftCard
            key={draftData.fileId}
            draftIndex={index}
            draft={draftData}
            selectedDraft={selectedDraft}
            setSelectedDraft={setSelectedDraft}
          />
        ))}
      </section>
    </main>
  );
};
