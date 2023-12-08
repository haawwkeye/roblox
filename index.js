let is_new_window = window.location.search != "";
function handle_new_win() {
    if (is_new_window) document.querySelector("a[id=win]").remove()
}
function checkUrl(str) {
    let success = true;
    let givenURL = null;
    try {
        givenURL = new URL(str);
    } catch (error) {
        success = false;
        givenURL = error
    }
    return {success: success, url: givenURL};
  }
function redirect(url) {
    var checked;
    if (url.startsWith("http://") || url.startsWith("https://"))
    {
        checked = checkUrl(url);
    } /*else {
        // check with http:// or https:// (try https first)
        var _url = checkUrl("https://" + url)
        if (!_url.success) _url = checkUrl("http://" + url);
        checked = _url;
    }*/
    const redirectBody = document.querySelector("div[id='redirectBody']");
    const redirectGo = document.querySelector("button[id='redirectGo']");
    const redirectBack = document.querySelector("button[id='redirectBack']");
    const toggleRedirect = document.querySelector("button[id='toggleRedirect']");

    if (checked.success) {
        redirectBody.innerHTML = `<b>Are you sure you want to go to <a class="link">${checked.url}</a></b>`
    } else {
        redirectBody.innerHTML = `<b><a class="link">${url}</a> is not a vaild link...</b>`
    }

    const cleanup_redirect = () => {
        redirectBack.onclick = null;
        redirectGo.onclick = null;
    }
    const redirect_func = () => {
        if (!checked.success) return redirectBack.click();
        document.location = checked.url;
        cleanup_redirect()
    }

    redirectBack.onclick = cleanup_redirect;
    redirectGo.onclick = redirect_func;

    toggleRedirect.click()
    // alert(url)
    // alert(vaild)
    // TODO: Prompt a modal before redirect
    // document.location = input.value;
}
function handle_redirect() {
    const input = document.querySelector("input[class='url']")
    input.onkeypress = function(e){
        if (!e) e = window.event;
        var keyCode = e.code || e.key;
        if (keyCode == 'Enter'){
            redirect(input.value);
            return false;
        }
    }
}

// Start of the DOMContentLoaded should let us run all the functions we want on start
document.addEventListener("DOMContentLoaded", async () => {
    handle_new_win()
    handle_redirect()
});
