# Heroine France site
A France Heroine related web page

To edit the data in the HTML page
1.	Search in the content folder and open the text file with the era name to be modified.
2.	Look up to the slide that need to be edit. Each of <div> with mySlides class is consider one slide.
3.	h5 tag is used for the title of that slide.
4.	p tag is used for the text content.
5.	lang attribute represent the language of that text.

To edit the image Content
1.	Copy the image into the respective folder inside the /img/ with that particular title
2.	Name the image with the description of that image to show the description
3.	Add the file name into the fileNames of that respective part in index.js.
 
To edit the title content
1.	open index.html
2.	edit the content in lang="en" to change the english content and "fr" for French Content

For timeline,
1.	The content in the timeline is in index.js (‘value’ represent year, ‘name’ is the description shown when hover, and ‘link’ is the id of the respective element that will scrolled to on click.)

Function:
1.	Timeknots.js (modified)
This is the external library to draw the timeline, and in this application, it modified to match the usage of timeline in the web page. The control of this function is mostly from Timeknots.draw() line, by changing the attribute parsing in second argument. Read README.md for reference related to timeknots.js.


