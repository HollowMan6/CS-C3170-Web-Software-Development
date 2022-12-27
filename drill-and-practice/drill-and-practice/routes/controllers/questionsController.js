import * as questionService from "../../services/questionService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js"
import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";
const questionValidationRules = {
  questionText: [validasaur.required, validasaur.minLength(1)],
};

const addQuestion = async ({ request, response, render, state, params }) => {
  const topicId = params.id
  const userId = (await state.session.get("user")).id
  const body = request.body({ type: "form" });
  const formParams = await body.value;
  const questionData = {
    topicId: topicId,
    questionText: formParams.get("question_text"),
  };
  const [passes, errors] = await validasaur.validate(
    questionData,
    questionValidationRules,
  );
  if (!passes) {
    questionData.validationErrors = errors
    questionData.currentTopicQuestions = await questionService.getQuestionsByTopicId(topicId)
    render("questions.eta", questionData);
  } else {
    await questionService.addQuestion(
      userId,
      topicId,
      questionData.questionText,
    );
    response.redirect(`/topics/${topicId}`);
  }
};

const showQuestionsPage = async ({ render, state, params }) => {
  const topicId = params.id

  render("questions.eta", {
    topicId,
    currentTopicQuestions: await questionService.getQuestionsByTopicId(topicId),
  })
}

const showQuestionPage = async ({ params, render }) => {
  const id = params.id
  const questionData = await questionService.getQuestionByQuestionID(id)
  questionData.details = await questionAnswerService.getAnswerByQuestionId(id)
  questionData.topicId = params.tid
  render("question.eta", questionData)
}

const deleteQuestion = async ({ params, response }) => {
  const id = params.id
  const tid = params.tid
  await questionService.deleteQuestion(id)
  response.redirect(`/topics/${tid}`)
}

const showQuiz = async ({ params, render }) => {
  const questionId = params.id
  const topicId = params.tid
  const questionData = await questionService.getQuestionByQuestionID(questionId)
  const quizData = {
    tid: topicId,
    id: questionData.id,
    text: questionData.question_text,
    options: await questionAnswerService.getAnswerByQuestionId(questionId)
  }
  render("quiz.eta", quizData)
}

const getRandomQuestion = async ({ response, params }) => {
  const topicId = params.tid
  const randomQuestion = await questionService.getRandomQuestion(topicId)
  if (randomQuestion !== null) {
    const questionId = randomQuestion.id
    response.redirect(`/quiz/${topicId}/questions/${questionId}`)
  } else {
    response.body = "There is no questions"
  }
}

const showQuizTopics = async ({ render }) => {
  render("quizByTopic.eta", {
    allTopics: await topicService.getTopicsAll(),
  })
}

const processPostAnswer = async ({ params, response, state }) => {
  const topicId = params.tid
  const questionId = params.id
  const optionId = params.optionId
  const userId = (await state.session.get("user")).id
  const corretOptionId = []
  const res = await questionAnswerService.getCorrectOption(questionId)
  for (let i = 0; i < res.length; i++) {
    corretOptionId.push(res[i].id)
  }
  const isCorrect = corretOptionId.includes(Number(optionId))
  await questionAnswerService.storePostAnswer(userId, questionId, optionId)
  if (isCorrect) {
    response.redirect(`/quiz/${topicId}/questions/${questionId}/correct`)
  } else {
    response.redirect(`/quiz/${topicId}/questions/${questionId}/incorrect`)
  }
}

const showCorrectPage = ({ render, params }) => {
  render("correct.eta", { tid: params.tid })
}

const showIncorrectPage = async ({ render, params }) => {
  const questionId = params.id
  const correctOptions = {
    data: [],
  }
  const res = await questionAnswerService.getCorrectOption(questionId)
  for (let i = 0; i < res.length; i++) {
    correctOptions.data.push(res[i].option_text)
  }
  correctOptions.tid = params.tid
  render("incorrect.eta", correctOptions)
}

export {
  addQuestion,
  showQuestionsPage,
  showQuestionPage,
  getRandomQuestion,
  deleteQuestion,
  showQuiz,
  showQuizTopics,
  processPostAnswer,
  showCorrectPage,
  showIncorrectPage,
};
