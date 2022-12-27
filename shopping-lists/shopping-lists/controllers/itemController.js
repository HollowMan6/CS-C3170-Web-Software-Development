import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

/** Process request to /lists/{id}/items */
const createItem = async (request) => {
    // Get id
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/")
    let id = urlParts[2]

    // Get items name
    const formData = await request.formData()
    const name = formData.get("name")

    await itemService.createItem(id, name)

    return requestUtils.redirectTo(`/lists/${id}`)
}

/** Process request to /lists/{id}/items/{item_id} */
const updateItem = async (request) => {
    // Get list id and item id
    const url = new URL(request.url)
    const urlParts = url.pathname.split("/")
    let list_id = urlParts[2]
    let item_id = urlParts[4]

    await itemService.updateItemById(item_id)
    return requestUtils.redirectTo(`/lists/${list_id}`)
}

export {createItem, updateItem}