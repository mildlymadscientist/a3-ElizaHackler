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
- (5 points) Describe how your site uses the CRAP principles in the Non-Designer's Design Book readings. Which element received the most emphasis (contrast) on each page? How did you use proximity to organize the visual information on your page? What design elements (colors, fonts, layouts, etc.) did you use repeatedly throughout your site? How did you use alignment to organize information and/or increase contrast for particular elements. Write a paragraph of at least 125 words *for each of four principles* (four paragraphs, 500 words in total). 

Contrast: While the user can choose to add colors to their posts that can seriously detract from the contrast, to increase accessibility and readibility I stuck to just black and white. This might be simple, but it is the standard for most webpages for accessibility reasons. The user, however, can make as much contrast as they want by breaking up their blog posts with different colors, shades, and tones. I wanated some customizibility which sacrificed perfect contrast. 

Repetition: I kept font color consistent, as well as font size. I found that repeating these things created a sense of coherency, and just varying font nuances like boldness did enough to differentiate them. I feel that repitition serves the goal of having it look very computer-programesque. I wanted it to feel robotic, not natural, so i kept most things consistent and did little to break from it. 

Alignment: I chose left aligned, as I feel it makes the viewer less confused (god forbid, right-aligned) and more incline to input information. Like it's left aligned, it's right here for you! But I didn't want it to feel very heavy towards one side when there were many posts, so I made the posts span the screen. Also, think of how strange it would look if there were half page color blocks for theposts with colored background. I almost wanted them to feeling like a knitting/crotchetting/weaving project. 

Proximity: I used proximity to give this a simple, old-school feel as I wanted to website to feel a bit like the computer programs that just read you line after line of code (like many, but the computer in Wargames is the only one that comes to mind right now). I kept things close, while grouping and splitting things into forms to prevent it from actually soffocating itself/overlapping and being unreadable. 

AI: Used AI to debug code with copilot, specifically the login function and sending URLs. I used some small examples found by the AI search helper to integrate into my code, but nothing large. 

Sources:
CS guides especially those on js, cookies, express, and mongodb, in class practice servers, and a2
Non-Designer's Design Book
https://www.w3schools.com/jsref/met_win_prompt.asp
https://www.w3schools.com/jsref/met_win_alert.asp
https://stackoverflow.com/questions/486896/adding-a-parameter-to-the-url-with-javascript

More specifics:

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
- Front-end to fetch information to put it into lists, add/update/delete, send prompts/alerts. 

Node.js:  
- Created an express server and a mongoDB database.

General:  
- Scored full marks on all lighthouse tests. 