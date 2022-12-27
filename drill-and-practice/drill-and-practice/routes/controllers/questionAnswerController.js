import { validasaur } from "../../deps.js";
import * as questionService from "../../services/questionService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js"

const answerValidationRules = {
    optionText: [validasaur.required, validasaur.minLength(1)],
}

const deleteAnswerOption = async ({ response, params }) => {
    const questionID = params.questionId
    const optionId = params.optionId
    await questionAnswerService.deleteAnswerByOptionId(optionId)
    await questionAnswerService.deleteAnswerOption(questionID, optionId)
    response.redirect(`/topics/${params.tid}/questions/${questionID}`)
}

const addAnswerOptions = async ({ request, response, render, params, state }) => {
    const id = params.id
    const body = request.body({ type: "form" });
    const data = await body.value;
    const answerOptionData = {
        optionText: data.get("option_text"),
        isCorrect: data.get("is_correct"),
    }
    const [passes, errors] = await validasaur.validate(
        answerOptionData,
        answerValidationRules,
    )
    const questionData = await questionService.getQuestionByQuestionID(id)
    const userId = (await state.session.get("user")).id
    if (userId !== questionData.user_id) {
        response.body = "You can not post option to other's question"
        return
    }
    if (!passes) {
        questionData.validationErrors = errors
        questionData.optionText = addAnswerOptions.optionText
        questionData.details = await questionAnswerService.getAnswerByQuestionId(id)
        questionData.topicId = params.tid
        render("question.eta", questionData);
    } else {
        const isCorrect = (answerOptionData.isCorrect === "on") ? true : false
        await questionAnswerService.addAnswerOptions(id, answerOptionData.optionText, isCorrect)
        response.redirect(`/topics/${params.tid}/questions/${id}`)
    }
}

export { addAnswerOptions, deleteAnswerOption }