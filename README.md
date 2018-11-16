# Description
  The program prompts the user to enter two github usernames. It then pulls data from the github api, specifically the 
  time of day of all their commits, and writes it to a .json file. The data is then visualised and displayed on a webpage
  at localhost port 8080. The bar graph displays The number of commits for each user plotted against time of day in one 
  hour intervals.

# Setup
  To be able to run the shell scripts you have to first make them executable.
 ```

 ```

# Libraries used:
###### Python
- PyGithub
- SimpleHTTPServer
- BaseHTTPServer
- json
- datetime
- sys
###### javascript
- d3
