"use strict";

var serverRequest = new XMLHttpRequest();

serverRequest.open('GET', 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture');
serverRequest.send();
serverRequest.onreadystatechange = function() {
    if (serverRequest.readyState == 4) {

        var formattedData = JSON.parse(serverRequest.responseText);
        var userArray = formattedData.results;

        createUser(userArray);
    }
}

az.onclick = function() {
    createlist();
}
za.onclick = function() {
    createlist(true);
}

function createlist(name) {
    var formattedData = JSON.parse(serverRequest.responseText);
    var userArray = formattedData.results;
    userArray.sort(sortList);

    if (name == true) {
        userArray.reverse();
    }

    var delet = document.getElementById('scrollingList');
    document.body.children[0].removeChild(delet);

    var scrollingList = document.createElement('div');
    scrollingList.id = "scrollingList";
    document.body.children[0].appendChild(scrollingList);

    createUser(userArray);
}

function createUser(array) {
    array.forEach(function(item, i, array) {
        var user = document.createElement('div');
        user.className = "user";
        user.innerHTML = array[i].name.title + ' ' + array[i].name.first + ' ' + array[i].name.last;
        if (array[i].name.title == "ms" || array[i].name.title == "mr" || array[i].name.title == "mrs") {
            user.innerHTML = array[i].name.title + '.' + ' ' + array[i].name.first + ' ' + array[i].name.last
        }
        ;
        changeRegister(user, 'div');

        var thumbnail = document.createElement('img');
        thumbnail.className = "userphoto";
        thumbnail.src = array[i].picture.thumbnail;
        user.insertBefore(thumbnail, user.firstChild);
        user.onclick = function() {

            shadow.style.display = 'block';
            (array[i].name.title == "miss" || array[i].name.title == "mister") ? h2.innerHTML = array[i].name.title + ' ' + array[i].name.first + ' ' + array[i].name.last : h2.innerHTML = ' ' + array[i].name.title + '.' + ' ' + array[i].name.first + ' ' + array[i].name.last;

            changeRegister(h2, 'h2');

            var location = document.getElementById('li1');
            location.innerHTML = array[i].location.street + " " + array[i].location.city + " " + array[i].location.state + " " + array[i].location.postcode;
            changeRegister(location, 'Location:');

            var phone = document.getElementById('li2');
            phone.innerHTML = array[i].phone;
            changeRegister(phone, 'Phone:');

            var email = document.getElementById('li3');
            email.innerHTML = "<b>" + "Email: " + "</b>" + '<br>' + array[i].email;

            var largephoto = document.getElementsByClassName('profilephoto')[0];
            largephoto.src = array[i].picture.large;
        }
        scrollingList.appendChild(user);
    })
}

function sortList(a, b) {
    if (a.name.first > b.name.first) {
        return 1;
    }
    if (a.name.first < b.name.first) {
        return -1;
    }
    return 0;
}

function changeRegister(elem, cause) {
    var username = elem.textContent;
    var upper = username.split(' ').map(function(a) {
        return a.charAt(0).toUpperCase() + a.slice(1);
    }).join(' ');
    if (cause == 'div' || cause == 'h2') {
        elem.innerHTML = '<span>' + upper + '</span>';
    } else {
        elem.innerHTML = '<b>' + cause + '</b>' + '<br>' + upper + '<br><br>';
    }

}
