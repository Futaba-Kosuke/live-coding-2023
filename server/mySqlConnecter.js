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
  if (task) {
    return task[0]
  } else {
    return undefined
  }
} 

// タスク追加
export const insertTask = async (json) => {
  const now = new Date()
  const insertResult = await mySqlClient.execute(`
    INSERT INTO task (
      title, completed, created_at, updated_at
    ) VALUES (
        ?, ?, ?, ?
    );
  `, [
      // タイトル
      json["title"],
      // 完了状態
      false,
      // 作成日時
      now,
      // 更新日時
      now
    ]
  ) 
  console.log(insertResult)
  return
}

// タスクの更新
export const updateTask = async (id, completed) => {
  const now = new Date()
  const updateResult = await mySqlClient.execute(`
    UPDATE task
      SET completed = ?, updated_at = ?
      WHERE id = ?;
  `, [
    // 完了状態
    completed,
    // 更新日時
    now,
    // id
    id
  ])
  console.log(updateResult)
  return
}