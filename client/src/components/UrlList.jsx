import React from "react";

const UrlList = ({ allUrls, copiedId, handleDelete, handleCopy }) => (
  <div className="mt-6 text-left">
    <h3 className="text-lg font-semibold mb-2 text-slate-500">All URLs:</h3>
    {allUrls.length === 0 ? (
      <p className="text-gray-700">No URLs yet.</p>
    ) : (
      <ul className="space-y-4">
        {allUrls.map((urlItem) => {
          const shortLink = `https://short-link-delta-wheat.vercel.app/api/${urlItem.shortUrl}`;
          return (
            <li
              key={urlItem._id}
              className="border p-3 rounded-md shadow-sm bg-gray-400"
            >
              <p>
                <strong className="text-gray-950">OriginalUrl:</strong>{" "}
                <a
                  href={urlItem.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 underline font-medium"
                >
                  {urlItem.originalUrl}
                </a>
              </p>
              <p>
                <strong className="text-gray-900">ShortedUrl:</strong>{" "}
                <a
                  href={shortLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-900 underline"
                >
                  {shortLink}
                </a>
              </p>
              <button
                onClick={() => handleDelete(urlItem.shortUrl)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => handleCopy(shortLink, urlItem._id)}
                className="ml-3 px-3 py-1 w-20 bg-gray-600 text-white rounded hover:bg-gray-800"
              >
                {copiedId === urlItem._id ? "Copied!" : "Copy"}
              </button>
              <p className="mt-2 text-white bg-gray-600 rounded px-2 py-1">
                <strong>Short URL ID:</strong> {urlItem.shortUrl} <br />
                <strong>Short URL:</strong> <strong>Clicks:</strong>{" "}
                <span className="inline-block bg-gray-600 rounded px-2 py-1">
                  {urlItem.clicks || 0}
                </span>
              </p>
              <p className="mt-1 text-white bg-gray-600 rounded px-2 py-1">
                <strong>Created At:</strong>{" "}
                <span className="inline-block bg-gray-600 px-2 py-1 rounded">
                  {new Date(urlItem.createdAt).toLocaleString()}
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    )}
  </div>
);

export default UrlList;
