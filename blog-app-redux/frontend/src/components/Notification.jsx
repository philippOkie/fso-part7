import { useSelector } from "react-redux";

const Notification = ({ message, appliedStyle }) => {
  const notification = useSelector((state) => state.notification);
  return (
    <>
      <p style={appliedStyle}>{notification}</p>
    </>
  );
};

export default Notification;
