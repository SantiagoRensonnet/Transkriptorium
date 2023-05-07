import { useNavigate } from "react-router-dom";

export const DraftCard = ({
  draft,
  draftIndex,
  selectedDraft,
  setSelectedDraft,
}) => {
  const navigate = useNavigate();
  //This is a hardcoded solution to what must be a API calling to check for all previously created drafts
  const { name, fileId } = draft;
  const draftsArray = ["Albatross_vol009of055-050-0"];
  const isIdValid = draftsArray.includes(fileId);
  return isIdValid ? (
    <article
      tabIndex={draftIndex}
      role="link"
      className={
        selectedDraft === fileId
          ? "draft-card border border-green7"
          : "draft-card"
      }
      onKeyDown={(e) => e.key === "Enter" && navigate(`editor/file/${fileId}`)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedDraft(fileId);
      }}
      onDoubleClick={() => navigate(`editor/file/${fileId}`)}
    >
      <figure className="flex h-5/6">
        <img
          className="flex-1 object-cover object-top"
          src={`/${fileId}.jpg`}
          alt="draft-image"
        />
      </figure>
      <div className="h-1/6 w-full flex items-center">
        <h1 className="ml-2">{name}</h1>
      </div>
    </article>
  ) : (
    <article className="draft-card bg-gray-100  cursor-not-allowed">
      <div className="text-center">
        <h1 className="text-red-500 text-lg">404</h1>
        <h2 className="text-base font-light">Resource not found</h2>
        <p className="font-extralight">
          {name} data is currently not available
        </p>
      </div>
    </article>
  );
};
