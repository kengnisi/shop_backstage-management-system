import mockRequests from'./mockAjax'

export const reqSale = ()=>mockRequests({
  method: "GET",
    url: "/sale",
})