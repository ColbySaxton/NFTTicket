import { useState } from "react";
import EventModal from "./EventModal";

const EventSelectionButton = (props) => {

    const [show, setShow] = useState(false);

    function showEvent() {
         setShow(true);
    }

  return (
    <div>
        { !show && <button className='btn' onClick={showEvent}>
            <h2>{props.text}</h2>
        </button> }
      { show && <EventModal /> }
    </div>
  );
};

export default EventSelectionButton;
