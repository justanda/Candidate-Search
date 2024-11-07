import { useState, useEffect } from "react";
import { searchGithub } from "../api/API";
import CandidateCard from "./CandidateCard";
import type {
  Candidate,
  CandidateSearch,
} from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  // Updated type of the local state function so that it aligns with the results of the first API call
  const [candidates, setCandidates] = useState<CandidateSearch[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem("savedCandidates");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      setCandidates(data);
    };

    fetchCandidates();
  }, []);

  useEffect(() => {
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  // This function now accepts a prop canddateInfo so that it ccan be passed in, in the child component to allow the local storage to get updated with the correct details from the API call that contgains EMAIL, Location ETC.
  const handleAccept = (candidateInfo: Candidate) => {
    if (candidates[currentIndex]) {
      setSavedCandidates([...savedCandidates, candidateInfo]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleReject = () => {
    setCurrentIndex(currentIndex + 1);
  };

  if (currentIndex >= candidates.length) {
    return <p>No more candidates available.</p>;
  }

  return (
    <CandidateCard
      candidate={candidates[currentIndex]}
      onAccept={handleAccept}
      onReject={handleReject}
    />
  );
};

export default CandidateSearch;
