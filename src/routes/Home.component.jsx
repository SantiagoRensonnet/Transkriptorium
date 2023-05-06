import { DraftCard } from "../components/containers/DraftCard";
export const Home = () => {
  const draftsData = [
    { name: "Albatross", fileId: "Albatross_vol009of055-050-0" },
  ];
  return (
    <main className="main-container">
      <section
        className={
          draftsData.length > 6 ? "draft-list sm:mb-20 sm:mt-4" : "draft-list"
        }
      >
        {draftsData.map((draftData) => (
          <DraftCard
            key={draftData.fileId}
            draftId={draftData.fileId}
            name={draftData.name}
          />
        ))}
      </section>
    </main>
  );
};
