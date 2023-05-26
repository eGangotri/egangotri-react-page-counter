import { backendServer } from "api/constants"
import { DailyWorkReportType } from "types/dailyyWorkReportTypes"
import { Buffer } from 'buffer';
const bcrypt = require("bcryptjs");

type LoginUser = {
  username: string,
  password: string
}

export async function pushReport(dailyReport:DailyWorkReportType) {
  const _url = `${backendServer}dailyWorkReport/add`
  console.log(`_url ${_url}`)

  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dailyReport),
  }

  const res = await fetch(_url, options)
  console.log(`res ${JSON.stringify(res)}`)
  const items = await res.json()
  console.log(`items ${items.length}`)
  return items
}

export async function checkValidCredentials(staffName: string, password: string) {
  const loginInfo = {
    username:staffName,
    password:password
  } as LoginUser;

  const _url = `${backendServer}user/checkValidCredentials`
  console.log(`_url ${_url}`)

  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginInfo),
  }

  const res = await fetch(_url, options)
  //shall be  {"response":false} or {"response":true}
  const items = await res.json()
  console.log(`checkValidCredentials:res ${JSON.stringify(items)}`)
  return items.response
}
