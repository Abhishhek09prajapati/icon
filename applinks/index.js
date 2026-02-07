
var main1 = document.getElementById('main1')
async function loadData() {
    try {
        const response = await fetch("https://api.npoint.io/e4ce4ee3d757ca0d87fb");

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        data.map(items => {
            var image = document.createElement('img')
            var div = document.createElement('div')
            image.className = "imagediv"
            div.className = "maindiv"
            image.src = `${items.image}`
            image.title = `${items.name}`

           
            
            div.appendChild(image)
            main1.appendChild(div)
            

                        

        })

        // use data here
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

loadData()



