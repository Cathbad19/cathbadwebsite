(function(){

    const imageArray = [
        {
            name: 'donut',
            img: 'images/donut.png',
        },
        {
            name: 'cheese',
            img: 'images/cheese.png',
        },
        {
            name: 'avocado',
            img: 'images/avocado.png',
        },
        {
            name: 'apple',
            img: 'images/apple.png',
        },
        {
            name: 'shish-kebab',
            img: 'images/shish-kebab.png',
        },
        {
            name: 'mushrooms',
            img: 'images/mushrooms.png',
        },
        {
            name: 'carrots',
            img: 'images/carrots.png',
        },
        {
            name: 'fried-egg',
            img: 'images/fried-egg.png',
        },
        {
            name: 'candy-cane',
            img: 'images/candy-cane.png',
        },
        {
            name: 'fried-chicken',
            img: 'images/fried-chicken.png',
        },
        {
            name: 'burger',
            img: 'images/burger.png',
        },
        {
            name: 'fries',
            img: 'images/fries.png',
        },
        {
            name: 'hot-dog',
            img: 'images/hot-dog.png',
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png',
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png',
        },
        {
            name: 'pizza',
            img: 'images/pizza.png',
        },
        ]

    const preloadImages = imageArray.map(item => {
        const img = new Image();
        img.src = item.img;
        return img;
    });

    const canvas = document.getElementById('hexmap');
    const ctx = canvas.getContext('2d');
    let randomImage = getRandomImage();
    let img = new Image();
    img.src = randomImage.img;

    let hexHeight,
        hexRadius,
        hexRectangleHeight,
        hexRectangleWidth,
        hexagonAngle = 0.523598776, // 30 degrees in radians
        sideLength = 50,
        boardWidth = 100,
        boardHeight = 100;

    hexHeight = Math.sin(hexagonAngle) * sideLength;
    hexRadius = Math.cos(hexagonAngle) * sideLength;
    hexRectangleHeight = sideLength + 2 * hexHeight;
    hexRectangleWidth = 2 * hexRadius;

    // functions _______________________________________________________________________________________________________

    img.onload = () => {

        if (canvas.getContext) {
            ctx.fillStyle = "#000000";
            ctx.strokeStyle = "#CCCCCC";
            ctx.lineWidth = 2;

            drawBoard(ctx, boardWidth, boardHeight);

            canvas.addEventListener("mousedown", function (eventInfo) {
                let x,
                    y,
                    hexX,
                    hexY,
                    screenX,
                    screenY,
                    rect;



                rect = canvas.getBoundingClientRect();
                x = eventInfo.clientX - rect.left;
                y = eventInfo.clientY - rect.top;


                hexY = Math.floor(y / (hexHeight + sideLength));
                hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);

                screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
                screenY = hexY * (hexHeight + sideLength);

                // ctx.clearRect(0, 0, canvas.width, canvas.height);

                drawBoard(ctx, boardWidth, boardHeight);

                // Check if the mouse's coords are on the board
                if (hexX >= 0 && hexX < boardWidth) {
                    if (hexY >= 0 && hexY < boardHeight) {
                        ctx.fillStyle = "#000000";
                        drawHexagon(ctx, screenX, screenY, true);

                        const imgWidth = 50; // Adjust to your image dimensions
                        const imgHeight = 50; // Adjust to your image dimensions
                        const imgX = screenX + hexRadius - imgWidth / 2; // Center horizontally
                        const imgY = screenY + hexRectangleHeight / 2 - imgHeight / 2; // Center vertically
                        ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);

                        randomImage = getRandomImage();
                        img = preloadImages[imageArray.indexOf(randomImage)];
                    }
                }
            });
        }
    };


    function drawBoard(canvasContext, width, height) {
        let i,
            j;

        for(i = 0; i < width; ++i) {
            for(j = 0; j < height; ++j) {
                drawHexagon(
                    ctx,
                    i * hexRectangleWidth + ((j % 2) * hexRadius),
                    j * (sideLength + hexHeight),
                    false
                );
            }
        }
    }


    function drawHexagon(canvasContext, x, y, fill) {
         fill = fill || false;

        canvasContext.beginPath();
        canvasContext.moveTo(x + hexRadius, y);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
        canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
        canvasContext.lineTo(x, y + sideLength + hexHeight);
        canvasContext.lineTo(x, y + hexHeight);
        canvasContext.closePath();

        if(fill) {
            canvasContext.fill();
        } else {
            canvasContext.stroke();
        }
    }


    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * imageArray.length);
        return imageArray[randomIndex];
    }




})();