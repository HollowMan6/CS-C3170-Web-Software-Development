import { executeQuery } from "../database/database.js";

const addTopic = async (userId, name) => {
  await executeQuery(
    "INSERT INTO topics (user_id, name) VALUES ($userId, $name)",
    {userId, name}
  );
};

const getTopicsNum = async () => {
  const res = await executeQuery(
    "SELECT count(id) FROM topics;"
  )

  return res.rows[0].count
}

const getTopicsAll = async () => {
  const res = await executeQuery(
    "SELECT * FROM topics ORDER BY name ASC;"
  )

  return res.rows
}

const getTopicsByUserId = async (userId) => {
  const res = await executeQuery(
    "SELECT * FROM topics WHERE user_id=$userId;",
    {userId}
  )

  return res.rows
}

const getTopicByTopicID = async (id) => {
  const res = await executeQuery(
    "SELECT * FROM topics WHERE id=$id;",
    {id}
  )
  
  return res.rows[0]
}

const deleteTopic = async (id) => {
  await executeQuery(
    "DELETE FROM topics WHERE id=$id;",
    {id}
  )
}

export { addTopic, getTopicsNum, getTopicsAll, getTopicsByUserId, getTopicByTopicID, deleteTopic }