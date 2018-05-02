
export function formatDate(d){
  let date = new Date(d);
  let year = date.getFullYear(), month = date.getMonth()+1, day = date.getDate();
  return year+'-'+(month<10?'0'+month:month)+'-'+(day<10?'0'+day:day)
}

export function sortList(movements) {
  if(movements){
    movements = JSON.parse(JSON.stringify(movements));
    movements ? movements.sort(function(a,b){
      let d1 = new Date(a.date);
      let d2 = new Date(b.date)
      if (d1 > d2) return -1;
      if (d1 < d2) return 1;
      let t1 = a.type.toLowerCase();
      let t2 = b.type.toLowerCase();
      if (t1 < t2) return 1;
      if (t1 > t2) return -1;
    }) : null;
  }
  return movements;
}