        //page setup

        //set random background
        let element = document.querySelector('html');
        element.style.background = "url(Assets/" + Math.floor(Math.random() * 21) + ".jpg)";
        element.style.backgroundRepeat = 'no-repeat';
        element.style.backgroundSize = 'cover';
        element.style.backgroundPosition = 'center';
        element.style.minHeight = "100%";

        //setup search options
        ["github", "stackoverflow", "w3schools"].forEach(element => {
            let selected = document.getElementById(element)
            selected.style.background = "rgba(135,206,250,0.6)"
        })







        //basic site functions
        function toggle(element){
            if (element.style.background === "rgba(135, 206, 250, 0.6)"){
                element.style.background = "rgba(255, 255, 255, 0.6)";
            } else {
                element.style.background = "rgba(135, 206, 250, 0.6)";
            }
        }



        // define tauri window
        const { invoke } = window.__TAURI__.tauri

        async function search(){
            let searchOptions = "";
            ["github", "stackoverflow", "w3schools", "google"].forEach(element => {
                let selected = document.getElementById(element)
                if (selected.style.background === "rgba(135, 206, 250, 0.6)"){
                    searchOptions = searchOptions + "T"
                } else {
                    searchOptions = searchOptions + "F"
                }
            })
            return invoke("search", {query: document.getElementById("SearchBox").value, parameters: searchOptions})

            // return await invoke("search", {query: document.getElementById("SearchBox").value, parameters: searchOptions})
        }

        async function close(){
            await invoke("close", {})
        }

        window.addEventListener("DOMContentLoaded", () => {
            console.log("Site Loaded")
            // define on enter press
            document.addEventListener('keydown', function(event){
                if (event.code==="Enter"){
                    search().then(Data => {
                        if (Data == 0) {
                            // failures
                        } else {
                            console.log("Requested site loaded")
                        }
                    }).catch(e => {
                        console.log(e)
                    });
                    
                }
            })
        })

