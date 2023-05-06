import { Link } from "react-router-dom";
export const DraftCard = ({ name, draftId }) => {
  return (
    <Link
      to={`editor/file/${draftId}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <article className="draft-card">
        <figure className="flex h-5/6">
          <img
            className="flex-1 object-cover object-top"
            src={`/${draftId}.jpg`}
            alt="draft-image"
          />
        </figure>
        <div className="h-1/6 w-full flex items-center">
          <h1 className="ml-2">{name}</h1>
        </div>
      </article>
    </Link>
  );
};
