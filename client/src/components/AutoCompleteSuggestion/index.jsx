import React from "react";
import styles from "./styles.module.css";

export function AutoCompleteSuggestion({ suggestion, onClick }) {
  return (
    <div className={styles.suggestionItem} onClick={onClick}>
      {suggestion.text}
    </div>
  );
}
