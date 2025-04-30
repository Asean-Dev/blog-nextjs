import React from "react";

type Props = {};

const HighlightedText = ({
  text,
  keyword,
}: {
  text: string;
  keyword: string;
}) => {
  if (!keyword) return <>{text}</>;

  const regex = new RegExp(`(${keyword})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <span key={index} style={{ backgroundColor: "#C5A365" }}>
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};
export default HighlightedText;
