import React, { useEffect, useRef } from "react";
import { AutoCompleteSuggestion } from "../AutoCompleteSuggestion";
import styles from "./styles.module.css";

export function AutoComplete({ children, suggestions, onClick, close }) {
  const element = useRef(null);

  useEffect(function () {
    document
      .querySelector("body")
      .addEventListener("click", closeOnOutsideClick, []);

    return function () {
      document
        .querySelector("body")
        .removeEventListener("click", closeOnOutsideClick);
    };
  });

  function closeOnOutsideClick(e) {
    if (element.current.contains(e.target)) return;
    close();
  }

  return (
    <div className={styles.autoComplete} ref={element}>
      <div className={styles.inputContainer}>{children}</div>
      <div className={styles.suggestionList}>
        {suggestions.map((suggestion) => (
          <AutoCompleteSuggestion
            onClick={() => onClick(suggestion.id)}
            suggestion={suggestion}
          />
        ))}
      </div>
    </div>
  );
}
