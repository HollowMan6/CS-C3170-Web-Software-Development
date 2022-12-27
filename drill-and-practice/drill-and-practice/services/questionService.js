import { executeQuery } from "../database/database.js";

const getQuestionsNum = async () => {
  const res = await executeQuery(
    "SELECT count(id) FROM questions;"
  )

  return res.rows[0].count
}

const getQuestionsByTopicId = async (topicId) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE topic_id=$topicId;",
    { topicId }
  )

  return res.rows
}

const getQuestionByQuestionID = async (id) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE id=$id;",
    { id }
  )

  return res.rows[0]
}

const addQuestion = async (userId, topicId, questionText) => {
  await executeQuery(
    "INSERT INTO questions (user_id, topic_id, question_text) VALUES ($userId, $topicId, $questionText)",
    { userId, topicId, questionText }
  );
};



const deleteQuestion = async (id) => {
  await executeQuery(
    "DELETE FROM questions WHERE id=$id;",
    { id }
  )
}

const getRandomQuestion = async (tid) => {
  const res = await executeQuery("SELECT * FROM questions where topic_id=$tid ORDER BY RANDOM() LIMIT 1;", { tid })
  const questionNumber = res.rows.length
  if (questionNumber === 0) {
    return null
  } else {
    return res.rows[0]
  }
}

const getRandomQuestionAPI = async () => {
  const res = await executeQuery("SELECT * FROM questions ORDER BY RANDOM() LIMIT 1;")
  const questionNumber = res.rows.length
  if (questionNumber === 0) {
    return null
  } else {
    return res.rows[0]
  }
}

export { addQuestion, getQuestionsNum, getQuestionsByTopicId, getQuestionByQuestionID, deleteQuestion, getRandomQuestion, getRandomQuestionAPI }