let is_new_window = window.location.search != "";
function handle_new_win() {
    if (is_new_window) document.querySelector("a[id=win]").remove()
}

function handle_redirect() {
    const input = document.querySelector("input[class='url']")
    input.onkeypress = function(e){
        if (!e) e = window.event;
        var keyCode = e.code || e.key;
        if (keyCode == 'Enter'){
            // TODO: Prompt a modal before redirect
            document.location = input.value;
            return false;
        }
    }
}

// Start of the DOMContentLoaded should let us run all the functions we want on start
document.addEventListener("DOMContentLoaded", async () => {
    handle_new_win()
    handle_redirect()
});
