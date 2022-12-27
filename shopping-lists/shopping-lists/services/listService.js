/** This file is used for operating the shopping_lists dataBase */
import { executeQuery } from "../database/database.js";

/** Create a list with the given name */
const createList = async (name) => {
    await executeQuery("INSERT INTO shopping_lists (name) VALUES ($name);", {
        name,
    })
}

const getListNum = async () => {
    let result = await executeQuery("SELECT COUNT(id) FROM shopping_lists;")
    return result.rows[0].count
}

/** Find all the shopping_lists entry that is active in the database */
const getAllLists = async () => {
    let result = await executeQuery("SELECT * FROM shopping_lists where active ORDER BY name;");
    return result.rows
}

/** Select the list according to the given id */
const getById = async (id) => {
    let result = await executeQuery("SELECT * FROM shopping_lists WHERE id=$id;", {
        id,
    })

    if (result.rows && result.rows.length > 0) {
        return result.rows[0];
    }
    
    return { id: 0, name: "List Does NOT Exists!" };
}

/** Update the list according to the given id */
const updateById = async (id) => {
    await executeQuery("UPDATE shopping_lists set active=FALSE WHERE id=$id;", {
        id,
    })
}

export {createList, getListNum, getAllLists, updateById, getById}