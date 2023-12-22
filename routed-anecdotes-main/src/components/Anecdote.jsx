import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const Anecdote = ({ anecdotes }) => {
  const style = {
    margin: "10px",
  };
  const { id } = useParams();
  const anecdote = anecdotes.find((a) => a.id === parseInt(id));
  if (!anecdote) {
    return <div>Anecdote not found</div>;
  }
  return (
    <div style={style}>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>for more info see {anecdote.info}</div>
      <div>has {anecdote.votes} votes</div>
    </div>
  );
};

Anecdote.propTypes = {
  anecdotes: PropTypes.array.isRequired,
};

export default Anecdote;
