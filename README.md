# movie_list_thing
movie project for job interview?


# To Get Started:

Backend:
(once rails is bundled and all is well) 
 puma -p 4000 


Frontend:
(uses react, can be run with npm or yarn) 

IMDB="YOUR_API_KEY_GOES_HERE" yarn start 

Sign Up, then Sign In. Have Fun.


# Additional Thoughts:
In retrospect, it is arguably quite obvious that I should have built this using redux. At first glance it didn't seem as though I would need to manage enough different pieces of state between components to justify the initial extra setup up time. However if I were to rebuild or revise the project, I think using redux to manage state would be the way to go. 

Additionally I'm aware that passing the ImdbApiKey via the front end is not a long term secure solution, and it really should be handled on the backend, but again for short term development purposes this seemed to be acceptable for simply trying to get the components and functionality up and running. 

It should also be noted that this project has **not been styled** seriously in anyway. I focused almost exclusively on the functionality and features, and really only used the quickest CSS to simply keep the elements from bumping into each other on normal sized laptop screen. Attempting to dramatically shrink the screen (weather to mock mobile views or while inspecting the page) may produce some pretty ugly results. 

Also while the assignment didn't require a user or login feature, I did build them as a matter of routine using JWT (though I'm not seriously using the tokens for anything,) if this were to be further developed with multiple users, the database would have to be redesigned so that movies were also associated with users, because as it stands the global rating values assigned (across lists) would also currently be the same for all users. 

Lastly I should mention that this was developed exclusively in Chrome. While it should work fine in other browsers, there *might* be mild styling/onClick issues in other browsers - so I recommend running in Chrome.
