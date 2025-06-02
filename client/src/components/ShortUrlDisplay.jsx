import React from "react";

const ShortUrlDisplay = ({ shortUrl, copied, handleCopyMain }) => (
  <div className="mt-4 text-green-600">
    <p className="mb-1">Short URL:</p>
    <div className="flex items-center justify-center gap-2">
      <a
        href={shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-600"
      >
        {shortUrl}
      </a>
      <button
        onClick={handleCopyMain}
        className="text-sm px-3 py-1 bg-gray-600 hover:bg-gray-800 text-white font-bold rounded-md"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  </div>
);

export default ShortUrlDisplay;
