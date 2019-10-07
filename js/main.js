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

function showLoader() {
    $('#loader').addClass('loading');
}

function hideLoader() {
    $('#loader').removeClass('loading');
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
        $talks.append('<li><h2>'+talk.title+'</h2><img src="'+talk.image+'" title="'+talk.title+'" alt="'+talk.title+'" /><p>'+talk.speaker+'<img src="'+talk.avatar+'" alt="'+talk.speaker+'" title="'+talk.speaker+'" /></p><a href="'+talk.slides+'">Ir a la presentación</a></li>');
    });
}