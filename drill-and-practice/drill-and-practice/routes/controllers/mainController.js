import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js"

const showMain = async({state, render}) => {
  const statData = {
    topics : 0,
    questions : 0,
    answers : 0,
  }

  statData.topics = await topicService.getTopicsNum()
  statData.questions = await questionService.getQuestionsNum()
  statData.answers = await questionAnswerService.getQuestionAnswersNum()

  render("main.eta", statData);
};

export { showMain };
