import React from "react";

const UrlForm = ({ url, setUrl, handleSubmit }) => (
  <form
    onSubmit={handleSubmit}
    className="flex flex-col sm:flex-row gap-3 items-center"
  >
    <input
      type="url"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="Enter your long URL"
      className="flex-1 px-4 py-2 border rounded-md w-full outline-none focus:ring-2 focus:ring-gray-600"
      required
    />
    <button
      type="submit"
      className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
    >
      Shorten
    </button>
  </form>
);

export default UrlForm;
