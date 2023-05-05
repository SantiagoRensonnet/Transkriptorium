import { DraftCard } from "../components/containers/DraftCard";
export const Home = () => {
  const draftsNames = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
  return (
    <main className="main-container">
      <section
        className={
          draftsNames.length > 6 ? "draft-list sm:mb-20 sm:mt-4" : "draft-list"
        }
      >
        {draftsNames.map((name, index) => (
          <DraftCard key={index} />
        ))}
      </section>
    </main>
  );
};
