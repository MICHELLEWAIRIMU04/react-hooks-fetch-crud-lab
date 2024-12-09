import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  // Fetch questions from the server when the component loads
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  // Function to handle question deletion
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setQuestions((prevQuestions) =>
            prevQuestions.filter((question) => question.id !== id)
          );
        } else {
          console.error("Failed to delete question");
        }
      })
      .catch((error) => console.error("Error deleting question:", error));
  }

  // Function to handle correct answer update
  function handleUpdateCorrectAnswer(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    })
      .then((response) => {
        if (response.ok) {
          setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
              question.id === id ? { ...question, correctIndex } : question
            )
          );
        } else {
          console.error("Failed to update correct answer");
        }
      })
      .catch((error) => console.error("Error updating question:", error));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;




