import React from "react";
import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const ShowVotes = (props) => {
  if (props.votes === 0) {
    return <h2>No votes has been casted</h2>;
  } else {
    return (
      <div>
        <h1>{props.quote}</h1>
        <h2>Has {props.votes} votes</h2>
      </div>
    );
  }
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(getVotes(anecdotes));

  function getVotes(arr) {
    let index = {};
    for (let i = 1; i <= arr.length; i++) {
      index[i] = 0;
    }
    return index;
  }

  const handleVote = () => {
    const voted = { ...votes };
    voted[selected + 1]++;
    setVotes(voted);
    // console.log(voted);
  };

  function mostVoted() {
    let max = 0;
    let index;
    for (let i in votes) {
      if (votes[i] > max) {
        index = i;
        max = votes[index];
      }
      console.log({ [index]: max });
      let result = { [index]: max };
      return result;
    }
  }

  const mostPopular = Number(Object.values(mostVoted())[0]);
  const mostPopularAnecdote =
    anecdotes[Number(Object.keys(mostVoted())[0]) - 1];

  return (
    <div>
      <h1>{anecdotes[selected]}</h1>
      <h2>Has {votes[selected + 1]} votes</h2>
      <button onClick={handleVote}>Vote</button>
      <Button
        handleClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
        text="Next"
      />
      {/* <button onClick={mostVoted}>Console</button> */}
      <h1>Most voted quote</h1>
      <ShowVotes quote={mostPopularAnecdote} votes={mostPopular} />
    </div>
  );
};

export default App;
