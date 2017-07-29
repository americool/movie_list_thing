//DIRECTIVES

movieThing.directive("notLoggedIn", function() {
    return {
        templateUrl: 'directives/notLoggedIn.html',
    }
})

movieThing.directive("isLoggedIn", function() {
    return {
        templateUrl: 'directives/isLoggedIn.html',
    }
})

movieThing.directive("searchImdb", function() {
    return {
        templateUrl: 'directives/searchImdb.html',
    }
})

movieThing.directive("displayMovie", function() {
    return {
        templateUrl: 'directives/displayMovie.html',
    }
})
