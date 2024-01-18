import config from "../../config.json" assert {type: "json"};
import addZapis from "./extension/addZapis.js";
import { mockCals } from "./extension/mockCals.js";
import { mockViewsContacts } from "./extension/mockViewsContacts.js"

function avitoService() {
  const user_id = 234324

  // const user_id = config.horizen.avito.avito_user
  // const response = fetch(`https://api.avito.ru/core/v1/accounts/${config.user_id}/calls/stats/`, {
  //   method: "POST",
  //   headers: {
  //     "Authorization": `Bearer ${config.horizen.avito.API_KEY}`,
  //     "Content-Type": "application/json"
  //   }
  // })


  const normalizeResponse = []

  mockCals.result.items.map((item) => {
    item.days.map((day) => {
      normalizeResponse.push({
        "date": day.date,
        "user_id": user_id,
        "itemId": item.itemId,
        "calls_answered": day.answered,
        "calls": day.calls,
        "calls_new": day.new,
        "calls_newAnswered": day.newAnswered
      })
    })
  })

  mockViewsContacts.result.items.forEach((item) => {
    item.stats.forEach((itemStats) => {
      const noData = ({ date, ...rest }) => rest
      const res = noData(itemStats)
      let newItem = normalizeResponse.find((itemFind) => itemFind.date === itemStats.date && itemFind.itemId === item.itemId)
      newItem = Object.assign(newItem,res)
    })
  })

  normalizeResponse.map((item) => {
    addZapis(item)
  })


}

export default avitoService;