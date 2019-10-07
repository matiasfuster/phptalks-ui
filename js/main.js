var DEBUG = true;

function parseRoute(path, args) {
    for (var rep in args) {
        path = path.replace(":"+rep, args[rep]);  
    }
    return CONFIG["api"].base_url + path;
}

function debug(data) {
    if (DEBUG) {
        console.log(data);
    }
}

var loaderTimeout = null;
function showLoader() {
    clearTimeout( loaderTimeout );
    loaderTimeout = null;
    
    $('#loader .loader').show();
    $('#loader .loader').height();
    $('#loader').addClass('loading');
    $('html').addClass('blockScroll');
}

function hideLoader() {
    $('#loader').removeClass('loading');
    loaderTimeout = setTimeout(function(){
        $('#loader .loader').hide();
        $('html').removeClass('blockScroll');
    }, 300);
}


function makeAPIRequest(url, method, successCallback, errorCallback, body) {
    showLoader();
    var req = {
        method: method,
        headers: {
            "Accept": "application/json"
        }
    };
    if (body !== undefined) {
        req.body = body;
    }
    fetch(
        url, 
        req
    )
    .then(function(response) {
        debug(response);
        hideLoader();
        successCallback(response);
    })
    .catch(function(err) {
        debug(err);
        hideLoader();
        errorCallback(err);
    });  
}


function fetchTalks() {
    var url = parseRoute(CONFIG["api"].endpoints.talks.listAll.path);
    var method = CONFIG["api"].endpoints.talks.listAll.method;
    makeAPIRequest(
        url, 
        method, 
        function(response) {
            if (response.status !== 200) {
                showError(response);
                return;
            }
      
            // Examine the text in the response
            response.json().then(function(data) {
                renderTalks(data)
            });
        },
        function(err) {            
            showError(err);
        }
    );
}

function showError(err) {
    // Do something
}
function renderTalks(talksList) {
    var $talks = $('#talks');

    $talks.html('');
    talksList.forEach(function(talk) {
        $talks.append('<li class="item"><div class="main-img img" style="background-image: url('+talk.image+');"></div><div class="title-holder"><h3 class="title">'+talk.title+'</h3><a href="'+talk.slides+'" class="link">Ver Slides</a></div><div class="speaker"><div class="avatar" style="background-image: url('+talk.avatar+');"></div><p class="name">'+talk.speaker+'</p></div><button type="button" class="like">Me gusta</button></li>');
    });
}


// <li class="item">
    // <div class="main-img img" style="background-image: url('+talk.image+');"></div>
    // <div class="title-holder">
        // <h3 class="title">'+talk.title+'</h3>
        // <a href="'+talk.slides+'" class="link">Ver Slides</a>
    // </div>
    // <div class="speaker">
        // <div class="avatar" style="background-image: url('+talk.avatar+');"></div>
        // <p class="name">'+talk.speaker+'</p>
    // </div>
    // <button type="button" class="like">Me gusta</button>
// </li>