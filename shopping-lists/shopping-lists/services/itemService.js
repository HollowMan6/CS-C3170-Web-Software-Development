import { executeQuery } from "../database/database.js";

const createItem = async (shopping_list_id, name) => {
    await executeQuery(
        "INSERT INTO shopping_list_items (shopping_list_id, name) VALUES ($shopping_list_id, $name);", {
        shopping_list_id,
        name,
    })
}

const getItemNum = async () => {
    let result = await executeQuery("SELECT COUNT(id) FROM shopping_list_items;")
    return result.rows[0].count
}

const getItemByListId = async (shopping_list_id) => {
    let result = await executeQuery("SELECT * FROM shopping_list_items WHERE shopping_list_id=$shopping_list_id AND NOT collected ORDER BY name;", {
        shopping_list_id
    })
    return result.rows
}

const getCollectedItemByListId = async (shopping_list_id) => {
    let result = await executeQuery("SELECT * FROM shopping_list_items WHERE shopping_list_id=$shopping_list_id AND collected ORDER BY name;", {
        shopping_list_id
    })
    return result.rows
}

const updateItemById = async (item_id) => {
    await executeQuery("UPDATE shopping_list_items set collected=TRUE WHERE id=$item_id;", {
        item_id
    })
}

const updateItemByListId = async (shopping_list_id) => {
    await executeQuery("UPDATE shopping_list_items set collected=TRUE WHERE shopping_list_id=$list_id;", {
        list_id
    })
}

export {createItem, getItemNum, getItemByListId, getCollectedItemByListId, updateItemById, updateItemByListId}