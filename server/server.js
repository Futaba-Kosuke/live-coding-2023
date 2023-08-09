import { serve } from "https://deno.land/std@0.180.0/http/server.ts"
import { serveDir } from "https://deno.land/std@0.180.0/http/file_server.ts";

import { getTaskList, getTaskById, insertTask, updateTask } from "./mySqlConnecter.js";

const optionsResult = (message, status = 200) => {
  return new Response(message, { status: status, headers: {
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*"
  }})
}

const postResult = (message, status = 200) => {
  return new Response(message, { status: status, headers: {
    "Access-Control-Allow-Origin": "*",
  }})
}

const messageToResult = (message, status = 200) => {
  return new Response(message, { status: status, headers: {
    "Access-Control-Allow-Origin": "*",
  }})
}

const jsonToResult = (json, status = 200) => {
  return new Response(JSON.stringify(json), { status: status, headers: {
    "Access-Control-Allow-Origin": "*"
  }})
}

serve(async (req) => {
  const pathname = new URL(req.url)?.pathname
  console.log(pathname)

  if (req.method === "GET") {
    // タスク一覧取得
    if (pathname === "/list") {
      const results = await getTaskList()
      return jsonToResult(results)
    }

    // タスク取得
    // 想定されるURL形式: https://.../task?task_id=xxx
    if (pathname === "/task") {
      // タスクのID取得
      const taskId = new URL(req.url)?.searchParams?.get("task_id")
      if (taskId) {
        const results = await getTaskById(taskId)
        return jsonToResult(results)
      } else {
        return messageToResult(`${taskId}のタスクは存在しません`, 500)
      }
    }

  } else if (req.method === "POST") {
    // タスク新規作成
    if (pathname === "/create") {
      const json = await req.json()
      if (json && json["title"] !== undefined) {
        await insertTask(json["title"])
      }
      return postResult("success")
    }

    // タスクの完了
    if (pathname === "/complete") {
      const json = await req.json()
      if (json) {
        await updateTask(json["id"], 1)
      }
      return postResult("success")
    }

  } else if (req.method === "OPTIONS") {
    return optionsResult("success")
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  })
})