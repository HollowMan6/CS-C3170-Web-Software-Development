import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";
const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

const addTopic = async ({ request, response, render, state }) => {
  const userId = (await state.session.get("user")).id
  const isAdmin = (await state.session.get("user")).admin
  const body = request.body({ type: "form" });
  const params = await body.value;
  const topicData = {
    isAdmin: isAdmin,
    name: params.get("name"),
  };
  const [passes, errors] = await validasaur.validate(
    topicData,
    topicValidationRules,
  );

  if (!passes || !isAdmin) {
    topicData.validationErrors = errors
    if (!isAdmin) {
      topicData.validationErrors = { admin: { error: "You are not admin!" } }
    }
    topicData.allTopics = await topicService.getTopicsAll()
    render("topics.eta", topicData);
  } else {
    await topicService.addTopic(
      userId,
      topicData.name,
    );
    response.redirect("/topics");
  }
};

const showTopicsPage = async ({ render, state, response }) => {
  const user = await state.session.get("user")
  render("topics.eta", {
    isAdmin: user.admin,
    allTopics: await topicService.getTopicsAll(),
  })
}

const deleteTopic = async ({ params, response, state }) => {
  const id = params.id
  const isAdmin = (await state.session.get("user")).admin
  if (isAdmin) {
    await topicService.deleteTopic(id)
  }
  response.redirect("/topics")
}

export {
  addTopic,
  showTopicsPage,
  deleteTopic
};
