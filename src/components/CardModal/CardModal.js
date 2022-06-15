import React from "react";
import Modal from "react-modal";
import logo from "../../assets/img/brainstation.png";
// import snowman from "../../assets/img/snowman.png";
// import rallydoc from "../../assets/img/rallydoc.svg";
import "./CardModal.scss";
// import CardTimer from "../CardTimer/CardTimer";
import dailydoubleimg from "../../assets/img/dailydouble.png";
import dailydoublesound from "../../assets/music/dailydouble.mp3";

Modal.setAppElement("#root");

const CardModal = ({
  question,
  points,
  answer,
  isOpen,
  closeModal,
  handlesCardClick,
  status,
  dailydouble,
  timerDuration,
}) => {
  const closeCardModal = () => {
    const overlay = document.querySelector(".ReactModal__Overlay");
    overlay.classList.add("ReactModal__Overlay--closed");
    setTimeout(function () {
      closeModal();
    }, 850);
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="cardmodal cardmodal--question" onClick={handlesCardClick}>
        {status === "points" && dailydouble ? (
          <>
            <img
              className="cardmodal__dailydouble"
              alt="dailydouble"
              src={dailydoubleimg}
            />
            <audio autoplay="autoplay" src={dailydoublesound}></audio>
          </>
        ) : status === "points" ? (
          <p className="cardmodal__text cardmodal__text--points">{points}</p>
        ) : status === "question" ? (
          <>
            <p className="cardmodal__points">{points}</p>
            <p className="cardmodal__text cardmodal__text--qa">{question}</p>
          </>
        ) : status === "timer" ? (
          <>
            <p className="cardmodal__points">{points}</p>
            <p className="cardmodal__text cardmodal__text--qa">{question}</p>
            {/* <CardTimer timerDuration={timerDuration} /> */}
          </>
        ) : (
          <>
            <p className="cardmodal__points">{points}</p>
            <p className="cardmodal__text cardmodal__text--qa">{answer}</p>
          </>
        )}
      </div>
      <img
        className="cardmodal__image"
        alt="logo"
        src={logo}
        onClick={closeCardModal}
      />
    </Modal>
  );
};

export default CardModal;
