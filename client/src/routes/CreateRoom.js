// importing library
import React from "react";

// for unique id
import { v1 as uuid } from "uuid";

// creating room with unique id
// localhost:3000/room/5

const CreateRoom = (props) => {
  function create() {
    const id = uuid();
    props.history.push(`/room/${id}`);
  }

  return (
    <button onClick={create} class="btn">
      {" "}
      Create Room{" "}
    </button>
  );
};

export default CreateRoom;
