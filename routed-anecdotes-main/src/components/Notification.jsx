const Notification = (notification) => {
  const messageToShow = JSON.stringify(notification.notification);

  return (
    <>
      <div>{messageToShow}</div>
    </>
  );
};

export default Notification;
