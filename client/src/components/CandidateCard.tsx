import { Candidate } from "../interfaces/Candidate.interface";

interface CandidateCardProps {
  candidate: Candidate;
  onAccept: () => void;
  onReject: () => void;
}

const CandidateCard = ({
  candidate,
  onAccept,
  onReject,
}: CandidateCardProps) => (
  <main>
    <div className="candidate-card">
      <img
        src={candidate.avatar}
        alt={`${candidate.username}'s avatar`}
        className="candidate-avatar"
      />
      <div className="candidate-info">
        <h2 className="candidate-name">
          {candidate.username}{" "}
          <span className="candidate-username">({candidate.username})</span>
        </h2>
        <p>Location: {candidate.location}</p>
        <p>
          Email:{" "}
          <a href={`mailto:${candidate.email}`} className="candidate-email">
            {candidate.email}
          </a>
        </p>
        <p>Company: {candidate.company}</p>
        <p className="candidate-bio">{candidate.bio}</p>
      </div>
      <div className="button-group">
        <button className="reject-btn" onClick={onReject}>
          -
        </button>
        <button className="accept-btn" onClick={onAccept}>
          +
        </button>
      </div>
    </div>
  </main>
);

export default CandidateCard;
