        //page setup

        //set random background
        let element = document.querySelector('html');
        element.style.background = "url(Assets/" + Math.floor(Math.random() * 11) + ".jpg)";
        element.style.backgroundRepeat = 'no-repeat';
        element.style.backgroundSize = 'cover';
        element.style.backgroundPosition = 'center';
        element.style.minHeight = "100%";

        //setup search options
        ["github", "stackoverflow", "w3schools"].forEach(element => {
            let selected = document.getElementById(element)
            selected.style.background = "rgba(135,206,250,0.6)"

            
        })




        // define tauri window
        const { invoke } = window.__TAURI__.tauri




        async function search(){
            await invoke("search", {query: document.getElementById("SearchBox").value});
        }


        window.addEventListener("DOMContentLoaded", () => {
            // define on enter press
            document.getElementById('SearchBox').onkeypress=function(event){
                if (event.keyCode==13){
                    search();
                }
            }
        })