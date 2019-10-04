var DEBUG = true;

var CONFIG = {
    base_url : 'http://localhost:8000',
    endpoints : {
        talks : {
            listAll : {
                method : 'get',
                path : '/talks'
            }
        }
    }
};

var MOCKED_TALK_LIST = [
    {
        "speaker" : "Matías Fuster",
        "avatar" : "https://api.columnis.com/uploads/046/images/thumbs/122_12_80@2.jpg",
        "title" : "Continuous Integration en AWS y Azure",
        "image" : "https://techpatrol.com.au/wp-content/uploads/2019/02/AWS-Azure-The-Difference-Tech-Patrol.png",
        "slides" : "",
        "tags" : [ "ci", "aws", "azure", "deployment", "agile"]
    },
    {
        "speaker" : "Agustín Tabárez",
        "avatar" : "https://api.columnis.com/uploads/046/images/thumbs/122_36_80@2.jpg",
        "title" : "Introducción a Docker",
        "image" : "https://www.nclouds.com/blog/wp-content/uploads/2018/10/reduce_docker_image_size_by_45.jpg",
        "slides" : "",
        "tags" : [ "docker", "container", "compose", "portability", "development", "deployment"]
    },
    {
        "speaker" : "Matías Fuster",
        "avatar" : "https://api.columnis.com/uploads/046/images/thumbs/122_12_80@2.jpg",
        "title" : "Continuous Integration en AWS y Azure",
        "image" : "https://techpatrol.com.au/wp-content/uploads/2019/02/AWS-Azure-The-Difference-Tech-Patrol.png",
        "slides" : "",
        "tags" : [ "ci", "aws", "azure", "deployment", "agile"]
    },
    {
        "speaker" : "Agustín Tabárez",
        "avatar" : "https://api.columnis.com/uploads/046/images/thumbs/122_36_80@2.jpg",
        "title" : "Introducción a Docker",
        "image" : "https://www.nclouds.com/blog/wp-content/uploads/2018/10/reduce_docker_image_size_by_45.jpg",
        "slides" : "",
        "tags" : [ "docker", "container", "compose", "portability", "development", "deployment"]
    },
    {
        "speaker" : "Matías Fuster",
        "avatar" : "https://api.columnis.com/uploads/046/images/thumbs/122_12_80@2.jpg",
        "title" : "Continuous Integration en AWS y Azure",
        "image" : "https://techpatrol.com.au/wp-content/uploads/2019/02/AWS-Azure-The-Difference-Tech-Patrol.png",
        "slides" : "",
        "tags" : [ "ci", "aws", "azure", "deployment", "agile"]
    },
    {
        "speaker" : "Agustín Tabárez",
        "avatar" : "https://api.columnis.com/uploads/046/images/thumbs/122_36_80@2.jpg",
        "title" : "Introducción a Docker",
        "image" : "https://www.nclouds.com/blog/wp-content/uploads/2018/10/reduce_docker_image_size_by_45.jpg",
        "slides" : "",
        "tags" : [ "docker", "container", "compose", "portability", "development", "deployment"]
    }
];



function parseRoute(path, args) {
    for (var rep in args) {
        path = path.replace(":"+rep, args[rep]);  
    }
    return CONFIG.base_url + path;
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
}

function hideLoader() {
    $('#loader').removeClass('loading');
    loaderTimeout = setTimeout(function(){
        $('#loader .loader').hide();
    }, 300)
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
    var url = parseRoute(CONFIG.endpoints.talks.listAll.path);
    var method = CONFIG.endpoints.talks.listAll.method;
    makeAPIRequest(
        url, 
        method, 
        function(response) {
            renderTalks(MOCKED_TALK_LIST);
        },
        function(err) {            
            renderTalks(MOCKED_TALK_LIST);
        }
    );
}

function renderTalks(talksList) {
    var $talks = $('#talks');

    $talks.html('');
    talksList.forEach(function(talk) {
        $talks.append('<li class="item"><div class="main-img img" style="background-image: url('+talk.image+');"></div><div class="title-holder"><h3 class="title">'+talk.title+'</h3><a href="'+talk.slides+'" class="link">Ver Slides</a></div><div class="speaker"><div class="avatar" style="background-image: url('+talk.avatar+');"></div><p class="name">'+talk.speaker+'</p></div></li>');
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
// </li>