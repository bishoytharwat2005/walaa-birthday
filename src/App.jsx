
import { useRef, useState } from "react";
import "./App.css";

const hearts = Array.from({ length: 35 }, (_, i) => i);

export default function App() {
  const [opened, setOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);

  const openLetter = async () => {
    if (opened) return;

    setOpened(true);

    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setMusicOn(true);
      } catch (error) {
        console.log("Audio playback failed:", error);
      }
    }

    setTimeout(() => {
      setShowMessage(true);
    }, 1000);
  };

  const backToEnvelope = () => {
    setShowMessage(false);
    setOpened(false);
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
    } else {
      try {
        await audioRef.current.play();
        setMusicOn(true);
      } catch (error) {
        console.log("Audio playback failed:", error);
      }
    }
  };

  return (
    <main className="birthday">
      <div className="glow"></div>

      <button className="music-btn" onClick={toggleMusic}>
        {musicOn ? "♫ Music On" : "♫ Music Off"}
      </button>

      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPause={() => setMusicOn(false)}
        onPlay={() => setMusicOn(true)}
      >
        <source src="/birthday-song.mp3" type="audio/mpeg" />
      </audio>

      <div className="floating-hearts">
        {hearts.map((item) => (
          <span
            key={item}
            style={{
              left: `${(item * 37) % 100}%`,
              animationDelay: `${(item % 7) * 0.8}s`,
              animationDuration: `${5 + (item % 5)}s`,
            }}
          >
            {item % 2 === 0 ? "♡" : "✦"}
          </span>
        ))}
      </div>

      {!showMessage ? (
        <section className={`intro ${opened ? "opening" : ""}`}>
          <div className="top-heart">♡</div>

          <h1>You have a surprise!</h1>

          <p>
            Someone special has a birthday message for you...
          </p>

          <div
            className={`envelope ${opened ? "envelope-open" : ""}`}
            onClick={!opened ? openLetter : undefined}
          >
            <div className="envelope-back"></div>

            <div className="letter">
              <span>For LOLA ♡</span>
            </div>

            <div className="envelope-front"></div>

            <div className="envelope-flap"></div>

            <div className="seal">♡</div>
          </div>

          {!opened && (
            <button className="open-btn" onClick={openLetter}>
              ✉ Open Your Letter
            </button>
          )}

          <p className="bottom-text">
            Made with love, just for you ♡
          </p>
        </section>
      ) : (
        <section className="letter-content">
          <div className="sparkle">✧</div>

          <div className="cake">🎂</div>

          <p className="small-title">
            A SPECIAL DAY FOR A SPECIAL PERSON
          </p>

          <h1>
            Happy Birthday Ya
            <span>LOLA</span>
          </h1>

          <div className="divider">♡ ✦ ♡</div>

          <p className="message">
            Today is all about you!
            <br />
            I hope your day is filled with happiness,
            <br />
            beautiful moments, endless laughter,
            <br />
            and everything your heart wishes for.
          </p>

          <p className="wish">
            May all your dreams come true.
          </p>

          <div className="gift">🎁 🌷 💗</div>

          <p className="signature">
            With lots of love ♡
          </p>

          <button className="open-btn" onClick={backToEnvelope}>
            ↶ Back to the envelope
          </button>
        </section>
      )}
    </main>
  );
}
