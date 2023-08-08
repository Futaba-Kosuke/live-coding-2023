import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts"

import { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DBNAME } from "./constants.js"

const mySqlClient = await new Client().connect({
    hostname: MYSQL_HOST,
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    db: MYSQL_DBNAME
})

// タスク一覧を取得
export const getTaskList = async () => {
  const tasks = await mySqlClient.query("SELECT * FROM task;")
  return {
    tasks: tasks
  }
}

// 単体タスクを取得
export const getTaskById = async (taskId) => {
  const task = await mySqlClient.query("SELECT * FROM task WHERE id = ?;", [ taskId ])
  return task
} 