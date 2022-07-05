import React from "react";

const People = ({ people, request }) => {
  return (
    <div>
      {people.map((p) => (
        <div>{p.name}</div>
      ))}
    </div>
  );
};

export default People;
