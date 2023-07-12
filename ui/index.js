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

        async function popup(message, state){
            popupElement = document.getElementById("popupText")

            if (state === 0) {
                console.log("displaying popup")
                popupElement.innerHTML = message
                popupElement.style.visibility = "visible"
                popupElement.style.height = "30px"
                console.log("awaiting popup closure")
                await setTimeout(popup, 7000, "", 1)
            } else {

                console.log("Closing popup")
                popupElement.style.height = "0px"
                popupElement.style.visibility = "hidden"
            }


        }



        // define tauri window
        const { invoke } = window.__TAURI__.tauri


        // orginize data and send it to rust backend
        async function search(){
            console.log(document.getElementById("popupText").style)

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
        }

        window.addEventListener("DOMContentLoaded", () => {
            console.log("Site Loaded")
            // define on enter press
            document.addEventListener('keydown', function(event){
                if (event.code==="Enter"){
                    // send data, once retrieved proccess return values
                    search().then(async Data => {
                        if (Data == 0) {
                            // if invoke-webbrowser failed in the backend; display popup explaining
                            await popup("Error accessing browser", 0)
                            console.error("Could not access client browser")
                        } else {
                            console.log("Requested site loaded")
                        }
                    }).catch(e => {
                        console.log(e)
                    });
                    
                }
            })
        })

