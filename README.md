Eliza Hackler

Deployed at https://a3-elizahackler.onrender.com and https://a3-elizahackler-production.up.railway.app. 

A blog site to post, edit, and delete blog posts. 

- the goal of the application was to create a persistent blog where each user can create a passworded account, add, edit, and delete posts. 
- challenges challenges I faced included of course figuring out login, as I had started by using findOne(username) == NULL to check for no username but it actually requires an asynch function and there are better ways to implement this function. 
- I used a simple
- I used TUICSS because I have no experience with any so I went through the retro ones and picked on I liked. I did not make any additonal changes. 
- Used express-static('public') to get JS frontend files from public folder. Used express-static('views') to get two HTML files (for login and the main page) from the views folder. Used express-json() for JSON requests. Used express.urlencoded({ extended: true}) to use URL data. For custom middleware i have an app.use to make sure the database was connected before one of my functions tried to load as I was getting errors. I did not use express-session as I had figured out  another workaround before realizing I wasn't using it properly, so I deleted it.  

Acheivements
Pictures in picture folder if needed. 
---

*Technical*
- Hosted on railway at https://a3-elizahackler-production.up.railway.app (pic_1 and pic_2) as well as on render at https://a3-elizahackler.onrender.com. 
- Got 100 on all 4 lighthouse tests (pic_3 and pic_4) by keeping things very simple, using only high contrast colors (black and white) and using labels that match names names and using metadata descriptions (which I only forgot because I used the cookies login example as a base). 

*Design/UX*
- (10 points) Make your site accessible using the [resources and hints available from the W3C](https://www.w3.org/WAI/). Implement/follow twelve tips from their [tips for writing](https://www.w3.org/WAI/tips/writing/), [tips for designing](https://www.w3.org/WAI/tips/designing/), and [tips for development](https://www.w3.org/WAI/tips/developing/). *Note that all twelve must require active work on your part*. For example, even though your page will most likely not have a captcha, you don't get this as one of your twelve tips to follow because you're effectively 
getting it "for free" without having to actively change anything about your site. Contact the course staff if you have any questions about what qualifies and doesn't qualify in this regard.
List each tip that you followed and describe what you did to follow it in your site.
- (5 points) Describe how your site uses the CRAP principles in the Non-Designer's Design Book readings. Which element received the most emphasis (contrast) on each page? How did you use proximity to organize the visual information on your page? What design elements (colors, fonts, layouts, etc.) did you use repeatedly throughout your site? How did you use alignment to organize information and/or increase contrast for particular elements. Write a paragraph of at least 125 words *for each of four principles* (four paragraphs, 500 words in total). 

12) write about CRAP

13) Implement 12 accessibility tips

Sources:
CS guides especially those on js, cookies, express, and mongodb, in class practice servers, and a2
Non-Designer's Design Book
https://www.w3schools.com/jsref/met_win_prompt.asp
https://www.w3schools.com/jsref/met_win_alert.asp
https://stackoverflow.com/questions/486896/adding-a-parameter-to-the-url-with-javascript


Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template

- Created one server using express. 
- fetched all data for a given username once logged in. 
- Adapted the add/delete/update functions from the CS guides for MongoDB and made it so different posts could be modified. Did updating using prompts. 
- Used MongoDB node js library to create one collection with a database for the users and a database for the posts. 
- Looked through CSS frameworks and picked TUI, a slightly more retro one with simple options. 

HTML:  
- Used textAreas, text, buttons, submit buttons, lists, forms and color pickers. 
- HTML pages for log in and mainpage, mainpage showing all posts and allowing posting functionality for the logged in username. If the login fails (wrong password), the user will be redirected to the login page, otherwise they will be logged in. If the account is new, an alert will be sent to the user. 

CSS:  
- Used TUI, tried to use built in TUI things but used some simple formatting too. 

JavaScript:  
- At minimum, a small amount of front-end JavaScript to get / fetch data from the server. See the [previous assignment](https://github.com/jmcuneo/a2-shortstack-a25) for reference.

Node.js:  
- Created an express server and a mongoDB database.

General:  
- Scored full marks on all lighthouse tests. 