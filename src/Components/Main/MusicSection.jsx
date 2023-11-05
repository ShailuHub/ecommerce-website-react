import React from "react";
import MusicItems from "../Music/MusicItems";

const MusicSection = () => {
  return (
    <React.Fragment>
      <section className="mt-5 mb-5">
        <h1 className="blockquote-footer fs-1 text-center mb-5">Music</h1>
        <MusicItems />
      </section>
    </React.Fragment>
  );
};

export default MusicSection;
