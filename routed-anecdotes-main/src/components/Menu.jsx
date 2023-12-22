import Notification from "./Notification";

const Menu = (notification) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Notification notification={notification.notification} />
      <a href="/anecdotes" style={padding}>
        anecdotes
      </a>
      <a href="/create" style={padding}>
        create new
      </a>
      <a href="/about" style={padding}>
        about
      </a>
    </div>
  );
};

export default Menu;
