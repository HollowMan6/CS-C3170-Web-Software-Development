/** The file is used for generate proper response for the request */
import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as listService from "../services/listService.js";
import * as itemsService from "../services/itemService.js"
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

/** Process the request POST /lists */
const addList = async (request) => {
    // Get the data sent in the form
    const formData = await request.formData()
    const name = formData.get("name")
    await listService.createList(name)

    return requestUtils.redirectTo("/lists")
}

/** Process the request GET /lists */
const viewLists = async (request) => {
    // Get all the lists entry
    const data = {
        lists: await listService.getAllLists(),
    }
    return new Response(await renderFile("lists.eta", data), responseDetails);
}

/** Process the request POST /lists/id */
const updateLists = async (request) => {
    // Get the id
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    let id = urlParts[2]

    // Update by id
    await listService.updateById(id)

    return requestUtils.redirectTo("/lists")
}

/** Process the request GET /lists/id */
const viewList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    let id = urlParts[2]
    const data = {
        list : await listService.getById(id),
        items : await itemsService.getItemByListId(id),
        items_collected : await itemsService.getCollectedItemByListId(id)
    }

    return new Response(await renderFile("list.eta", data), responseDetails);
}

export {addList, viewLists, updateLists, viewList}