import { executeQuery } from "../database/database.js";

const findUserByEmail = async (email) => {
    const res = await executeQuery(
        "SELECT * FROM users WHERE email=$email ",
        { email },
    )

    return res.rows
}

const addUser = async (email, password) => {
    await executeQuery(
        "INSERT INTO users (email, password) VALUES ($email, $password)",
        { email, password }
    )
}

export { addUser, findUserByEmail }