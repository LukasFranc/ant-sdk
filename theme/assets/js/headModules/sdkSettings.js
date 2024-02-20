function createCssLink(developer, versionScript) {
    let link = document.createElement('link')
    let d = new Date().getTime()
    let version = developer !== '' ? '?v=' + d : '?v=' + versionScript
    let url = '/user/documents/assets/dist' + developer + '/main.css'
    link.rel = 'stylesheet'
    link.type = 'text/css'

    var request = new XMLHttpRequest();
    request.open('GET', 'https://' + window.location.hostname + url + version, true);
    request.onreadystatechange = function(){
        if (request.readyState === 4){
            if (request.status === 404) {
                link.href = '/user/documents/assets/dist/main.css' + version
                console.log('%cNepodařilo se načíst CSS developer assety, bude použita poslední verze globálních assetů.', 'background: red; color:#fff;')
            } else {
                link.href = url + version
            }
        }
    };
    request.send();


    document.head.appendChild(link)
}

function createJavascriptLink(developer, versionScript) {
    let script = document.createElement('script')
    let d = new Date().getTime()
    let version = developer !== '' ? '?v=' + d : '?v=' + versionScript
    let url = '/user/documents/assets/dist' + developer + '/build.min.js'
    script.type = 'text/javascript'

    var request = new XMLHttpRequest();
    request.open('GET', 'https://' + window.location.hostname + url + version, true);
    request.onreadystatechange = function(){
        if (request.readyState === 4){
            if (request.status === 404) {
                script.src = '/user/documents/assets/dist/build.min.js' + version
                console.log('%cNepodařilo se načíst JS developer assety, bude použita poslední verze globálních assetů.', 'background: red; color:#fff;')
            } else {
                script.src = url + version
            }
        }
    };
    request.send();

    document.body.appendChild(script)
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


if (getCookie('developer') !== '') {
    setCookie('debugTimestamp', 1, 1000);
}
