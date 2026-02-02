import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { ModalsContext } from "../contexts/ModalsContext";
import { ModalTypes } from "../utils/modalTypes";
import { faqItems } from "../data/faq";

const Navbar = ({ admin }) => {
  const openModal = useContext(ModalsContext).openModal;
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [authButtonText, setAuthButtonText] = useState("Sign up");
  const [adminButtonText, setAdminButtonText] = useState("Admin");
  const [showFaq, setShowFaq] = useState(false);
  const [faqQuery, setFaqQuery] = useState("");
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName != null) {
        setUser(`Hi ${user.displayName}`);
        setAuthButtonText("Sign out");
      }
    });

    // Clean up the onAuthStateChanged listener when the component unmounts
    return () => unsubscribe();
  }, [user.displayName]);

  const handleAdmin = () => {
    if (location.pathname.includes("admin")) {
      navigate(import.meta.env.BASE_URL);
      setAdminButtonText("Admin");
    } else {
      navigate(import.meta.env.BASE_URL + "admin");
      setAdminButtonText("Home");
    }
  };

  const handleAuth = () => {
    if (user) {
      setUser("");
      setAuthButtonText("Sign up");
    } else {
      openModal(ModalTypes.SIGN_UP);
    }
  };

  const filteredFaqItems = faqItems.filter(({ question, answer }) => {
    const query = faqQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      question.toLowerCase().includes(query) ||
      answer.toLowerCase().includes(query)
    );
  });

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <div className="navbar-brand mb-0 h1 me-auto d-flex align-items-center gap-2">
          <img
            src={import.meta.env.BASE_URL + "logo.png"}
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          The Markatplace
          <div
            className="faq-tab"
            tabIndex={0}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setShowFaq(false);
              }
            }}
          >
            <button
              type="button"
              className="btn btn-outline-light btn-sm"
              onClick={() => setShowFaq((current) => !current)}
            >
              FAQ
            </button>
            {showFaq && (
              <div className="faq-panel">
                <input
                  className="form-control form-control-sm mb-2"
                  type="text"
                  placeholder="Search FAQs"
                  value={faqQuery}
                  onChange={(event) => setFaqQuery(event.target.value)}
                />
                <div className="faq-results">
                  {filteredFaqItems.length === 0 ? (
                    <div className="faq-empty">No matches found.</div>
                  ) : (
                    filteredFaqItems.map((item, index) => (
                      <div key={index} className="faq-item">
                        <button
                          type="button"
                          className="faq-question"
                          onClick={() =>
                            setActiveFaqIndex(activeFaqIndex === index ? null : index)
                          }
                        >
                          {item.question}
                        </button>
                        {activeFaqIndex === index && (
                          <div className="faq-answer-popover">{item.answer}</div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row row-cols-auto">
          <div className="navbar-brand">{user}</div>
          {admin && (
            <button onClick={handleAdmin} className="btn btn-secondary me-2">{adminButtonText}</button>
          )}
          <button onClick={handleAuth} className="btn btn-secondary me-2">{authButtonText}</button>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  admin: PropTypes.bool
}

export default Navbar;
