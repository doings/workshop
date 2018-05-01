
export function formatDate(d){
  let date = new Date(d);
  let year = date.getFullYear(), month = date.getMonth()+1, day = date.getDate();
  return year+'-'+(month<10?'0'+month:month)+'-'+(day<10?'0'+day:day)
}