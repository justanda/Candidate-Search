import { useEffect, useState } from "react";
import { Candidate, CandidateSearch } from "../interfaces/Candidate.interface";
import { getUserDetails } from "../api/API";

interface CandidateCardProps {
  candidate: CandidateSearch;
  onAccept: (candidateInfo: Candidate) => void; //Updated prop for the function to take valuie so we could pass in the details from the child to update the state value and local storage in teh parent to avoid having to move all of that doen here
  onReject: () => void;
}

const CandidateCard = ({
  candidate,
  onAccept,
  onReject,
}: CandidateCardProps) => {
  // Candidate Info state value to store results of API call
  const [candidateInfo, setCandidateInfo] = useState<Candidate>(
    {} as Candidate
  ); // type assertion to assert that the default value of the state variable is of the type of the state value IE {} as Candidate
  //  Using the username of candidate passed in for the card currently rendered on the screen we are hitting the API for that specific user to get the details and store them in the state value that we used to update the saved users state value from the parent VIA the prop passed into the onAccept function
  useEffect(() => {
    const fetchCandidateDetails = async () => {
      // API call to get the user details based on the username of the card currently rendered on the screem
      const data = await getUserDetails(candidate.username);
      if (data) setCandidateInfo(data);
    };

    fetchCandidateDetails();
  }, [candidate]);

  return (
    <main>
      <div className="candidate-card">
        <img
          //these were changed to use the candidateInfo state value from this component that we fetched and set using the useEffect above ^^
          src={candidateInfo.avatar}
          alt={`${candidateInfo.username}'s avatar`}
          className="candidate-avatar"
        />
        <div className="candidate-info">
          <h2 className="candidate-name">
            {candidateInfo.username}{" "}
            <span className="candidate-username">
              ({candidateInfo.username})
            </span>
          </h2>
          <p>Location: {candidateInfo.location}</p>
          <p>
            Email:{" "}
            <a
              href={`mailto:${candidateInfo.email}`}
              className="candidate-email"
            >
              {candidateInfo.email}
            </a>
          </p>
          <p>Company: {candidateInfo.company}</p>
          <p className="candidate-bio">{candidateInfo.bio}</p>
        </div>
        <div className="button-group">
          <button className="reject-btn" onClick={onReject}>
            -
          </button>
          <button
            className="accept-btn"
            onClick={() => {
              // we are now passing the local state variable for this candidate card currently rendered with the details into the onAccept function to add it local storage and also to update the state value savedCandidates aboce in tbe Candidate Search
              onAccept(candidateInfo);
            }}
          >
            +
          </button>
        </div>
      </div>
    </main>
  );
};

export default CandidateCard;
