import axios from "axios";
import { Candidate, CandidateSearch } from "../interfaces/Candidate.interface";

const GITHUB_API_BASE_URL = "https://api.github.com";

export const searchGithub = async (): Promise<CandidateSearch[]> => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer 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`,
          Accept: "application/vnd.github+json",
        },
      }
    );
    const users = response.data;
    return users.map((user: { id: string; login: string }) => ({
      id: user.id,
      username: user.login,
    }));
  } catch (error) {
    console.error("Error fetching GitHub users:", error);
    return [];
  }
};
export const getUserDetails = async (
  username: string
): Promise<Candidate | null> => {
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/users/${username}`,
      {
        headers: {
          Authorization: `Bearer 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`,
          Accept: "application/vnd.github+json",
        },
      }
    );
    const user = response.data;
    return {
      id: user.id,
      username: user.login,
      location: user.location || "N/A",
      avatar: user.avatar_url,
      email: user.email || "N/A",
      link: user.html_url,
      company: user.company || "N/A",
      bio: user.bio || "N/A",
    };
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    return null;
  }
};
