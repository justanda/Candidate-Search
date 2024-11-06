import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedCandidates");
    setSavedCandidates(saved ? JSON.parse(saved) : []);
  }, []);

  const handleReject = (id: number) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.id !== id
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  if (savedCandidates.length === 0) {
    return <p>No candidates have been accepted.</p>;
  }

  return (
    <div className="saved-candidates-container">
      <h2 className="title">Potential Candidates</h2>
      <table className="candidates-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>
                <img
                  className="avatar"
                  src={candidate.avatar}
                  alt={`${candidate.username}'s avatar`}
                />
              </td>
              <td>
                {candidate.username} <br />
                <em>({candidate.username})</em>
              </td>
              <td>{candidate.location}</td>
              <td>
                <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
              </td>
              <td>{candidate.company}</td>
              <td>{candidate.bio}</td>
              <td>
                <button
                  className="reject-btn"
                  onClick={() => handleReject(candidate.id)}
                >
                  &#x2212;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
