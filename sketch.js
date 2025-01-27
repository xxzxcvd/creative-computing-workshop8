


let weatherData;
let sunnyImg;
let rainyImg;
let snowyImg;
let cloudyImg;
let raindrops = [];
let snowflakes = [];
let clouds = [];

let weatherIcons = {
  "晴": "sun.png",
  "雨": "rain.png",
  "云": "cloud.png"
};



function preload() {
  // 这里替换为你使用的真实天气 API 的 URL
  let apiUrl = 'https://devapi.qweather.com/v7/weather/now?location=101010100&key=03e3f4e740d8462fa44e58ae2ed33941';
  loadJSON(apiUrl, gotData);
  sunnyImg = loadImage('sun.png');
  rainyImg = loadImage('rain.png');
  cloudImg = loadImage('cloud.png');
}

function gotData(data) {
  weatherData = data.now;
}



function setup() {
  createCanvas(800, 600);
  background(220);
  if (weatherData) {
    drawWeatherInfo(weatherData);
    drawWeatherImage(weatherData);
    drawWindDirection(weatherData);
    drawTemperatureBar(weatherData);
    // 根据天气状况初始化相应元素
    if (weatherData.text=== "雨") {
      for (let i = 0; i < 100; i++) {
        raindrops.push(new Raindrop());
      }
    } else if (weatherData.text === "雪") {
      for (let i = 0; i < 100; i++) {
        snowflakes.push(new Snowflake());
      } 
    }else if (weatherData.text === "晴") {
      for (let i = 0; i < 1; i++) {
        clouds.push(new Cloud(random(width), random(height / 2)));
      }
    } else if (weatherData.text === "阴") {
      for (let i = 0; i < 10; i++) {
        clouds.push(new Cloud(random(width), random(height)));
      }
    }
  }
}

function draw() {
  background(220);
  if (weatherData) {
    drawWeatherInfo(weatherData);
    drawWeatherImage(weatherData);
    drawWindDirection(weatherData);
    drawTemperatureBar(weatherData);
    if (weatherData.text === "雨") {
      for (let raindrop of raindrops) {
        raindrop.fall();
        raindrop.show();
      }
    } else if (weatherData.text === "雪") {
      for (let snowflake of snowflakes) {
        snowflake.fall();
        snowflake.show();
      } 
    }else if (weatherData.text === "晴") {
      for (let cloud of clouds) {
        cloud.move();
        cloud.show();
      }
      drawSun();
    } else if (weatherData.text === "阴") {
      for (let cloud of clouds) {
        cloud.move();
        cloud.show();
      }
    }
  }
}


function drawWeatherImage(data) {
  let imgSize = 200;
  let x = width - imgSize - 20;
  let y = 20;
  let weather = data.text;
  if (weather === "晴") {
    image(sunnyImg, x, y, imgSize, imgSize);
  } else if (weather === "雨") {
    image(rainyImg, x, y, imgSize, imgSize);
  } else if (weather === "云") {
    image(cloudImg, x, y, imgSize, imgSize);
  }
}


function drawWeatherInfo(data) {
  fill(0);
  textSize(16);
  let y = 30;
  text(`temperature: ${data.temp}°C`, 20, y);
  y += 30;
  text(`Feeling temperature: ${data.feelsLike}°C`, 20, y);
  y += 30;
  text(`humidity: ${data.humidity}%`, 20, y);
  y += 30;
  text(`wind direction: ${data.dew}°`, 20, y);
  y += 30;
  text(`Wind speed: ${data.windSpeed}m/s`, 20, y);
  y += 30;
  text(`Air pressure: ${data.pressure} hPa`, 20, y);
}

function drawWeatherIcons(data) {
  let iconSize = 100;
  let x = width - iconSize - 20;
  let y = 20;
  let weather = data.text;
  if (weather === "晴") {
    fill(255, 255, 0);
    ellipse(x + iconSize / 2, y + iconSize / 2, iconSize);
  } else if (weather === "雨") {
    for (let i = 0; i < 50; i++) {
      let rainX = random(x, x + iconSize);
      let rainY = random(y, y + iconSize);
      stroke(0, 0, 255);
      line(rainX, rainY, rainX, rainY + random(10, 20));
    }
  } else if (weather === "Snow") {
    for (let i = 0; i < 50; i++) {
      let snowX = random(x, x + iconSize);
      let snowY = random(y, y + iconSize);
      fill(255);
      ellipse(snowX, snowY, 5);
    }
  }
}

function drawWindDirection(data) {
  let windAngle = radians(data.dew);
  let arrowLength = map(data.windSpeed, 0, 20, 0, 100);
  let arrowX = width / 2;
  let arrowY = height - 50;
  push();
  translate(arrowX, arrowY);
  rotate(windAngle);
  stroke(0);
  fill(0);
  triangle(0, 0, arrowLength, 0, arrowLength - 10, -10);
  triangle(0, 0, arrowLength, 0, arrowLength - 10, 10);
  pop();
}

function drawTemperatureBar(data) {
  let temp = data.temp;
  let barWidth = 200;
  let barHeight = 30;
  let barX = 20;
  let barY = height - 100;
  let tempColor = map(temp, -20, 40, 0, 255);
  fill(tempColor, 0, 0);
  rect(barX, barY, barWidth * temp / 40, barHeight);
  fill(0);
  console.log(temp)
  text(`${temp}°C`, barX + barWidth + 10, barY + barHeight / 2);
}
function drawSun() {
  fill(255, 255, 0);
  let sunSize = 100;
  ellipse(width / 2, height / 4, sunSize);
  // 绘制太阳光线
  for (let i = 0; i < 10; i++) {
    let angle = map(i, 0, 10, 0, TWO_PI);
    let x = width / 2 + cos(angle) * (sunSize / 2 + 20);
    let y = height / 4 + sin(angle) * (sunSize / 2 + 20);
    line(width / 2, height / 4, x, y);
  }
}

class Raindrop {
  constructor() {
    this.x = random(width);
    this.y = random(-200, 0);
    this.speed = random(5, 15);
  }

  fall() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-200, 0);
    }
  }

  show() {
    stroke(0, 0, 255);
    line(this.x, this.y, this.x, this.y + 10);
  }
}

class Snowflake {
  constructor() {
    this.x = random(width);
    this.y = random(-200, 0);
    this.speed = random(1, 5);
    this.size = random(2, 5);
  }

  fall() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-200, 0);
    }
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.size);
  }
}


class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(1, 3);
    this.size = random(50, 150);
  }

  move() {
    this.x += this.speed;
    if (this.x > width + this.size) {
      this.x = -this.size;
    }
  }

  show() {
    fill(128);
    ellipse(this.x, this.y, this.size);
    ellipse(this.x + this.size / 2, this.y - this.size / 3, this.size);
    ellipse(this.x + this.size, this.y, this.size);
  }
}