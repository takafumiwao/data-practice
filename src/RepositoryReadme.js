import React, { useState, useEffect, useCallback } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function RepositoryReadme({ repo, login }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [markdown, setMarkdown] = useState("");

  const loadReadme = useCallback(async (login, repo) => {
    setLoading(true);
    const uri = `https://api.github.com/repos/${login}/${repo}/readme`;
    const { download_url } = await fetch(uri).then((res) => res.json());
    const markdown = await fetch(download_url).then((res) => res.text());
    setMarkdown(markdown);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!repo || !login) return;
    loadReadme(login, repo).catch(setError);
  }, [repo, loadReadme, login]);

  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  if (loading) return <p>Loading...</p>;

  return <ReactMarkdown>{markdown}</ReactMarkdown>;
}
