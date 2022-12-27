import { executeQuery } from "../database/database.js";

const getQuestionAnswersNum = async () => {
    const res = await executeQuery(
        "SELECT count(id) FROM question_answer_options;"
    )

    return res.rows[0].count
}

const getAnswerByQuestionId = async (id) => {
    const res = await executeQuery(
        "SELECT * FROM question_answer_options WHERE question_id=$id;",
        { id }
    )

    return res.rows
}

const addAnswerOptions = async (id, optionText, isCorrect) => {
    await executeQuery(
        "INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($id, $optionText, $isCorrect);",
        { id, optionText, isCorrect }
    )
}

const deleteAnswerOption = async (questionId, optionId) => {
    await executeQuery(
        "DELETE FROM question_answer_options WHERE question_id=$questionId AND id=$optionId;",
        { questionId, optionId }
    )
}

const deleteAnswerByOptionId = async (optionId) => {
    await executeQuery(
        "DELETE FROM question_answers WHERE question_answer_option_id=$optionId;",
        { optionId }
    )
}

const getCorrectOption = async (questionId) => {
    const res = await executeQuery(
        "SELECT * FROM question_answer_options WHERE question_id=$questionId AND is_correct=true;",
        { questionId }
    )

    return res.rows
}

const storePostAnswer = async (userId, questionId, optionId) => {
    await executeQuery(
        "INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES ($userId, $questionId, $optionId);",
        { userId, questionId, optionId }
    )
}

export {
    addAnswerOptions,
    getQuestionAnswersNum,
    getAnswerByQuestionId,
    deleteAnswerOption,
    getCorrectOption,
    storePostAnswer,
    deleteAnswerByOptionId
}