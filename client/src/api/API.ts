import axios from "axios";
import { Candidate } from "../interfaces/Candidate.interface";

const GITHUB_API_BASE_URL = "https://api.github.com";

export const searchGithub = async (): Promise<Candidate[]> => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/users`);
    const users = response.data;
    return users.map((user: any) => ({
      id: user.id,
      username: user.login,
      location: user.location || "N/A",
      avatar: user.avatar_url,
      email: user.email || "N/A",
      link: user.html_url,
      company: user.company || "N/A",
      bio: user.bio || "N/A",
    }));
  } catch (error) {
    console.error("Error fetching GitHub users:", error);
    return [];
  }
};

export const searchGithubUser = async (
  username: string
): Promise<Candidate | null> => {
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/users/${username}`
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
