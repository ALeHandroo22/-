const div = document.getElementById("cells")

let date = new Date("2026-12")
console.log(date)
if (date.getMonth() == 0 || date.getMonth() == 2 || date.getMonth() == 4 || date.getMonth() == 6 || date.getMonth() == 7 || date.getMonth() == 9 || date.getMonth() == 11 ){
    
   for (let i =1;i<=31;i++){
    const element = document.createElement("div")
    element.className = "nubmers-cells"
    element.innerHTML = `<p>${i}</p>`

    div.appendChild(element)


   } 
    
    
   

}