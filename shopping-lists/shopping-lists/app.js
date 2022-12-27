/** The server is created and the requests is dipathed in the file*/
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as mainController from "./controllers/mainController.js"
import * as listController from "./controllers/listController.js"
import * as itemController from "./controllers/itemController.js"

/** Configure the path to find the Eta files */
configure({
    views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
    const url = new URL(request.url)

    if (url.pathname === "/" && request.method === "GET") {
        return await mainController.getStatistics(request)
    }else if (url.pathname === "/lists" && request.method === "GET") {
        return await listController.viewLists(request)
    } else if (url.pathname === "/lists" && request.method === "POST") {
        return await listController.addList(request)
    } else if (url.pathname.match("/lists/[0-9]+") && request.method === "GET") { 
        return await listController.viewList(request)
    } else if (url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
        return await itemController.updateItem(request)
    } else if (url.pathname.match("/lists/[0-9]+/items") && request.method === "POST") {
        return await itemController.createItem(request)
    } else if (url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST") {
        return await listController.updateLists(request)
    } else {
        return new Response("Not found", { status: 404 });
    }
}

let port = 7777;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}

serve(handleRequest, { port });
