# creative-computing-workshop8

https://xxzxcvd.github.io/creative-computing-workshop8/

CODE:
 Global variable declaration:
- cloudyImg is used to store cloudy images.
- clouds array is used to store cloud objects.
  
preload function:
- Load cloudy images.
  
setup function:
- Initialize different elements according to different weather conditions, such as creating different numbers of clouds for sunny and cloudy days.
  
draw function:
- Update and display different elements according to weather conditions, such as updating and displaying the sun and clouds for sunny days and updating and displaying clouds for cloudy days.
  
drawSun function:
- Draw a yellow sun and draw sun rays to make the sun look more vivid.
  
Cloud class:
- Cloud class, which contains position, speed, and size properties.
- move method updates the position of the cloud and repositions it to the left when the cloud exceeds the right side of the canvas.
- show method draws the cloud using multiple ellipses.

Instructions:
1. Save the above HTML and JavaScript files to the same directory.
2. Open the HTML file and view it in the browser. You will see weather information, wind direction arrows, temperature bars, corresponding weather images, and various dynamic effects, including raindrops on rainy days, snowflakes on snowy days, sun and clouds on sunny days, and clouds on cloudy days.

Study notes:

1. Learn to create different animation elements according to different weather conditions, such as sun and clouds on sunny days and clouds on cloudy days.
2. Master how to use classes and methods to implement animation effects and update logic for different elements.
3. Further understand how to expand visualization effects based on weather data to make the entire weather visualization richer and more vivid
