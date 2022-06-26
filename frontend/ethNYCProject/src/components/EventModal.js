import { useState } from "react";

const EventModal = (props) => {
  const [locked, handleLock] = useState(true);

  const checkout = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
    handleLock(false);
  };

  return (
    <div>
      <p>Your Event Info</p>
      <div className="resp-container">
        <iframe src="https://my.spline.design/untitled-ad9a3470207fc71cc992c4f5341100fd/"></iframe>
      </div>
    </div>
  );
};

export default EventModal;
