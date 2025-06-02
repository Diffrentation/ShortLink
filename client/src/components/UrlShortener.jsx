import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import UrlForm from "./UrlForm";
import ShortUrlDisplay from "./ShortUrlDisplay";
import LogoutButton from "./auth/LogoutButton"
import UrlList from "./UrlList";

const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [allUrls, setAllUrls] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [copied, setCopied] = useState(false);

  const fetchAllUrls = async () => {
    try {
      const res = await fetch("/api");
      const data = await res.json();
      if (Array.isArray(data)) {
        setAllUrls(data);
      } else {
        setAllUrls([]);
        console.error("Expected array but got:", data);
      }
    } catch (err) {
      console.error("Failed to fetch URLs:", err);
      setAllUrls([]);
    }
  };

  const handleDelete = async (shortUrl) => {
    try {
      await fetch(`/api/${shortUrl}`, {
        method: "DELETE",
      });
      setShortUrl("");
      fetchAllUrls();
      toast.success("URL deleted successfully!");
    } catch (err) {
      console.error("Error deleting URL:", err);
      toast.error("Failed to delete URL");
    }
  };

  const handleCopyMain = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopy = async (urlToCopy, id = null) => {
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setCopiedId(id);
      toast.success("URL copied to clipboard!");
      setTimeout(() => setCopiedId(null), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy URL");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to shorten URL");

      const generatedUrl = `http://localhost:3000/api/${data.shortUrl}`;
      setShortUrl(generatedUrl);
      setUrl("");
      fetchAllUrls();
      toast.success("URL Created successfully!");
    } catch (err) {
      setError(err.message || "Something went wrong");
      toast.error("URL already exists or invalid URL");
    }
  };

  useEffect(() => {
    fetchAllUrls();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 mt-12 rounded-2xl shadow-lg border text-center bg-white">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">URL Shortener</h2>
      <div className="flex justify-end mb-4">
        <LogoutButton />
      </div>

      <UrlForm url={url} setUrl={setUrl} handleSubmit={handleSubmit} />

      {shortUrl && (
        <ShortUrlDisplay
          shortUrl={shortUrl}
          copied={copied}
          handleCopyMain={handleCopyMain}
        />
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}

      <UrlList
        allUrls={allUrls}
        copiedId={copiedId}
        handleDelete={handleDelete}
        handleCopy={handleCopy}
      />
    </div>
  );
};

export default UrlShortener;
