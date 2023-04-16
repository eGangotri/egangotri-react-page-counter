import { backendServer } from "api/constants"
import { DailyWorkReportType } from "types/dailyyWorkReportTypes"

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
