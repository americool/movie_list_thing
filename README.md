# movie_list_thing
movie project for job interview?


# To Get Started:

Backend:
(once rails is bundled and all is well)
 puma -p 4000

Frontend (React.js):
 (uses react, can be run with npm or yarn)

 For Angular Frontend app: NPM/Yarn Start should work and install local dependencies

 ~IMDB="YOUR_API_KEY_GOES_HERE" yarn start~

 **^^DON'T DO THIS: Update figaro's config/application.example.yml file with your key and drop the "example" part as described below and within the example file itself**

 Sign Up, then Sign In. Have Fun.



 # New features for AngularJS Frontend:

 1.) The API Key has been moved to the backend via rails figaro gem. Change the config/application.example.yml to application.example and add your own imdb key. Slightly more detailed instructions are in the example file. This may not be the ideal solution, by it seems securer than the previous solution.

 2.) I’ve moved the change rating button out of the main list-view interface. Now upon clicking on a movie saved to a list the user is prompted with an Update rating for {movie} option. I felt this was a more elegant way to handle rating changes of movies saved to lists.

 # Additional Notes post Angular Update:

 1.) I started out working with $ng-resource as a way to make API calls because it was heavily encouraged by documentation and tutorials I watched. However the more I worked with my current backend creation I realized that using $http requests were more suited for my needs.  I also realize that to probably maximize the advantages of using $resource, i should have stored the API calls within a factory and made get/post/etc requests within the same function, however It didn’t seem particularly pragmatic to the current backend api calls I had built and my experience with various tutorials had primarily demonstrated keeping api calls in services.

 2.) Thought it didn’t seem necessary at the earlier phases, the individual controllers should probably broken into separate files. The api calls in services could also be broken down more.

 3.) I didn’t use unique/custom scope for the various directives, though I know it’s often better to. However there didn’t seem to be any clear instances where overwriting/overlapping $scope properties were likely or problematic.




# Additional Thoughts:
In retrospect, it is arguably quite obvious that I should have built this using redux. At first glance it didn't seem as though I would need to manage enough different pieces of state between components to justify the initial extra setup up time. However if I were to rebuild or revise the project, I think using redux to manage state would be the way to go.

~Additionally I'm aware that passing the ImdbApiKey via the front end is not a long term secure solution and it really should be handled on the backend, but again for short term development purposes this seemed to be acceptable for simply trying to get the components and functionality up and running.~

It should also be noted that this project has **not been styled** seriously in anyway. I focused almost exclusively on the functionality and features, and really only used the quickest CSS to simply keep the elements from bumping into each other on normal sized laptop screen. Attempting to dramatically shrink the screen (weather to mock mobile views or while inspecting the page) may produce some pretty ugly results.

Also while the assignment didn't require a user or login feature, I did build them as a matter of routine using JWT (though I'm not seriously using the tokens for anything.) If this were to be further developed with multiple users, the database would have to be redesigned so that movies were also associated with users, because as it stands the global rating values assigned (across lists) would also currently be the same for all users.

Lastly I should mention that this was developed exclusively in Chrome. While it should work fine in other browsers, there *might* be mild styling/onClick issues in other browsers - so I recommend running in Chrome.
