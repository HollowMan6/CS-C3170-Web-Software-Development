import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";
import { bcrypt } from "../../deps.js";

const userValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)],
}

const showRegisterForm = ({ render }) => {
    render("register.eta")
}

const addUser = async ({ request, response, render }) => {
    const body = request.body({ type: "form" })
    const params = await body.value
    const userData = {
        email: params.get("email"),
        password: params.get("password"),
    }
    const [passes, errors] = await validasaur.validate(
        userData,
        userValidationRules,
    );

    if (!passes) {
        userData.validationErrors = errors
        render("register.eta", userData)
    } else {
        await userService.addUser(userData.email, await bcrypt.hash(userData.password))
        response.redirect("/auth/login")
    }
}

const showLoginForm = ({ render }) => {
    render("login.eta")
}

const processLogin = async ({ request, response, state, render }) => {
    const body = request.body({ type: "form" })
    const params = await body.value

    const userFromDatabase = await userService.findUserByEmail(
        params.get("email"),
    )
    if (userFromDatabase.length != 1) {
        render("login.eta", { error: "There is no such user, please register" })
        return
    }
    const user = userFromDatabase[0];
    const passwordMatches = await bcrypt.compare(
        params.get("password"),
        user.password,
    )
    if (!passwordMatches) {
        render("login.eta", { error: "Your credentials are wrong", originEmail: user.email })
        return
    }
    await state.session.set("user", user)
    response.redirect("/topics")
}

export { showRegisterForm, addUser, showLoginForm, processLogin }