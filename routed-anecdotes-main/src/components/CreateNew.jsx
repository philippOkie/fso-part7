import { useField } from "../hooks";

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    content.onChange({ target: { value: "" } });
    author.onChange({ target: { value: "" } });
    info.onChange({ target: { value: "" } });
  };

  const reset = (e) => {
    e.preventDefault();
    content.onReset();
    author.onReset();
    info.onReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button onClick={handleSubmit} type="submit">
          create
        </button>
        <button onClick={(e) => reset(e)}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
