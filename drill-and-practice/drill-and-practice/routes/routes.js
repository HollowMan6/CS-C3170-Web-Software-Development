import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as questionsController from "./controllers/questionsController.js";
import * as questionAnswerController from "./controllers/questionAnswerController.js";
import * as userController from "./controllers/userController.js";
import * as questionApi from "./apis/questionApi.js"

const router = new Router();

router.get("/", mainController.showMain);
router.get("/topics", topicsController.showTopicsPage)
router.post("/topics", topicsController.addTopic)
router.post("/topics/:id/delete", topicsController.deleteTopic)
router.get("/topics/:id", questionsController.showQuestionsPage)
router.post("/topics/:id/questions", questionsController.addQuestion)
router.get("/topics/:tid/questions/:id", questionsController.showQuestionPage)
router.post("/topics/:tid/questions/:id/delete", questionsController.deleteQuestion)
router.post("/topics/:tid/questions/:id/options", questionAnswerController.addAnswerOptions)
router.post("/topics/:tid/questions/:questionId/options/:optionId/delete", questionAnswerController.deleteAnswerOption)
router.get("/auth/register", userController.showRegisterForm)
router.post("/auth/register", userController.addUser)
router.get("/auth/login", userController.showLoginForm)
router.post("/auth/login", userController.processLogin)
router.get("/quiz", questionsController.showQuizTopics)
router.get("/quiz/:tid", questionsController.getRandomQuestion)
router.get("/quiz/:tid/questions/:id", questionsController.showQuiz)
router.post("/quiz/:tid/questions/:id/options/:optionId", questionsController.processPostAnswer)
router.get("/quiz/:tid/questions/:id/correct", questionsController.showCorrectPage)
router.get("/quiz/:tid/questions/:id/incorrect", questionsController.showIncorrectPage)
router.get("/api/questions/random", questionApi.getRandomQuestion)
router.post("/api/questions/answer", questionApi.processAnswer)

export { router };
