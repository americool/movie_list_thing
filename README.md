# movie_list_thing
movie project for job interview?


# To Get Started:

Backend:
(once rails is bundled and all is well)
 puma -p 4000

Original Frontend (React.js):
 (uses react, can be run with npm or yarn)

For Angular Frontend app: NPM/Yarn Start should install local dependencies

 ~IMDB="YOUR_API_KEY_GOES_HERE" yarn start~

 **^^DON'T DO THIS: Update figaro's .yml file at *movie-api/config/application.example.yml* with your key and drop the "example" part as described below and in more detail in the example file itself**

 Sign Up, then Sign In. Have Fun.



 # New features for AngularJS Frontend:

 1.) The API Key has been moved to the backend via rails figaro gem. Change the config/application.example.yml to application.example and add your own imdb key. Slightly more detailed instructions are in the example file. This may not be the ideal solution, by it seems more secure than the previous approach.

 2.) I’ve removed the "change rating" button from the list-view page. Instead, now upon clicking on a movie saved to a list the user is prompted with an Update rating option along side the displayed movie details. I felt this removed unnecessary details from the page, and provided a more elegant way to handle rating changes of movies saved to lists that was also in symmetry (both visually and in terms of reusable components) with searching for a movie by title. (*Note: displaying a movie and its details is now also handled by a single component for all three cases where it used.*)

 3.) The Filter buttons are also handled more elegantly with an NG-repeat function that iterates through an array of objects which each contain a name, filter-type, and a boolean reverse property.

 # Additional Notes post Angular Update:

 1.) I started out working with $resource as a way to make API calls because it was heavily encouraged by documentation and tutorials I watched (without being clearly explained). However the more I worked with my current backend creation, (and encountered a few bugs and limitations of $resource,) I realized that using the standard $http requests were more suited for my needs. There are still some $resource calls throughout my code that are basically functioning as plain $http requests and not taking advantages of the RESTful features allowed by $resource. In further revision I might consider removing them or building some kind of factory which allows multiple calls from a single API endpoint (which would probably require some backend re-configuration as well,) as oppose to using them as singular functions from a service.

 2.) Thought it didn’t seem necessary at the earlier phases, the individual controllers should probably broken into separate files. The api calls in services could also be broken down more.

 3.) I didn’t use unique/custom scope for the various directives, though I know it’s often better to. However there didn’t seem to be any clear instances where overwriting/overlapping $scope properties were likely or problematic.




# Additional Thoughts:
In retrospect, it is arguably quite obvious that I should have built this using redux. At first glance it didn't seem as though I would need to manage enough different pieces of state between components to justify the initial extra setup up time. However if I were to rebuild or revise the project, I think using redux to manage state would be the way to go.

~Additionally I'm aware that passing the ImdbApiKey via the front end is not a long term secure solution and it really should be handled on the backend, but again for short term development purposes this seemed to be acceptable for simply trying to get the components and functionality up and running.~

It should also be noted that this project has **not been styled** seriously in anyway. I focused almost exclusively on the functionality and features, and really only used the quickest CSS to simply keep the elements from bumping into each other on normal sized laptop screen. Attempting to dramatically shrink the screen (weather to mock mobile views or while inspecting the page) may produce some pretty ugly results.

Also while the assignment didn't require a user or login feature, I did build them as a matter of routine using JWT (though I'm not seriously using the tokens for anything.) If this were to be further developed with multiple users, the database would have to be redesigned so that movies were also associated with users, because as it stands the global rating values assigned (across lists) would also currently be the same for all users.

Lastly I should mention that this was developed exclusively in Chrome. While it should work fine in other browsers, there *might* be mild styling/onClick issues in other browsers - so I recommend running in Chrome.
