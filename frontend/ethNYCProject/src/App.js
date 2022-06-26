import "./css/App.css";
import WalletButton from "./components/WalletButton";
import EventSelectionButton from "./components/EventSelectionButton";
import Title from "./components/Title";
import { useState } from "react";

function App() {

  const [isWalletConnected, connectWallet] = useState(false);
  const [onHomePage, setOnHomePage] = useState(true);
  const [locked, handleLock] = useState(true);

  const checkout = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
    handleLock(false);
  };

  const goToHomePage = () => {
    setOnHomePage(true);
  };

  const goAwayFromHomePage = () => {
    setOnHomePage(false);
  };

  const handleChange = async () => {
    console.log("Here there: ");
    connectWallet(true);
    console.log(isWalletConnected);
  };

  return (
    <div className="App">
      <div className="row row-separate">
        <Title text="Eth NYC Project"></Title>
        <WalletButton onClick={handleChange}></WalletButton>
      </div>
      <div className="flexitem-center">
        <div className="row">
          <div className="btn" onClick={goToHomePage}>
            Home
          </div>
          <div className="btn" onClick={goAwayFromHomePage}>
            Your Events
          </div>
        </div>
      </div>
      <hr size="2" color="grey"></hr>
      {isWalletConnected && (
        <div>
          <h3>Welcome New User. Connect your wallet here:</h3>
          <WalletButton onClick={handleChange}></WalletButton>
          {locked && (
            <div className='btn' onClick={checkout} style={{ cursor: "pointer" }}>
              Log In to Unlock to Unlock Available Events
              <span aria-label="locked" role="img">
                🔒
              </span>
            </div>
          )}
          {!locked && (
            <div>
              <div>
                {" "}
                Unlocked!{" "}
                <span aria-label="unlocked" role="img">
                  🗝
                </span>
              </div>
              <EventSelectionButton text="New York Rangers vs. Tampa Bay Lightning"></EventSelectionButton>
            </div>
          )}
        </div>
      )}

      {onHomePage && (
        <div>
          <h3>Welcome to Eth NYC Project! View your available events:</h3>
          <div className="btn" onClick={goAwayFromHomePage}>
            Your Events
          </div>
        </div>
      )}
      {!onHomePage && (
        <div>
          {locked && (
            <div className='btn' onClick={checkout} style={{ cursor: "pointer" }}>
              Log In to Unlock to Unlock Available Events
              <span aria-label="locked" role="img">
                🔒
              </span>
            </div>
          )}
          {!locked && (
            <div>
              <div>
                {" "}
                Unlocked!{" "}
                <span aria-label="unlocked" role="img">
                  🗝
                </span>
              </div>
              <EventSelectionButton text="New York Rangers vs. Tampa Bay Lightning"></EventSelectionButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
