// img configs
let img
let imgRatio
let imgWidth
let imgHeight

// canvas configs
let canvasWidth = 1280
let canvasHeight = 720
let canvasImgRatio_H
let canvasImgRatio_V

// vertexes
let canvasVertex
let imgVertex
let shapeVertex

function preload() {
    img = loadImage('demo.jpg')

}

function setup() {
    createCanvas(canvasWidth, canvasHeight)
    imgRatio = img.height / img.width

    imgWidth = canvasWidth / 2
    imgHeight = imgWidth * imgRatio

    canvasImgRatio_H = canvasWidth / imgWidth
    canvasImgRatio_V = canvasHeight / imgHeight

    canvasVertex = {
        NW: {
            x: 0,
            y: 0
        },
        NE: {
            x: width,
            y: 0
        },
        SW: {
            x: 0,
            y: height
        },
        SE: {
            x: width,
            y: height
        }
    }

    imgVertex = {
        NW: {
            x: (width - imgWidth) / 2,
            y: (height - imgHeight) / 2
        },
        NE: {
            x: (width - imgWidth) / 2 + imgWidth - 1,
            y: (height - imgHeight) / 2
        },
        SW: {
            x: (width - imgWidth) / 2,
            y: (height - imgHeight) / 2 + imgHeight - 1
        },
        SE: {
            x: (width - imgWidth) / 2 + imgWidth - 1,
            y: (height - imgHeight) / 2 + imgHeight - 1
        }
    }


}

function draw() {
    background(0)
    imageMode(CENTER)
    image(img, canvasWidth / 2, canvasHeight / 2, imgWidth, imgHeight)

    // extending the pixel to the edge
    // vertexes of the light shape
    shapeVertex = {
        north: {
            v1: {
                x: imgVertex.NW.x,
                y: imgVertex.NW.y
            },
            v2: {
                x: canvasVertex.NW.x,
                y: canvasVertex.NW.y
            },
            v3: {
                x: canvasVertex.NW.x + canvasImgRatio_H,
                y: canvasVertex.NW.y
            },
        },
        east: {
            v1: {
                x: imgVertex.NE.x,
                y: imgVertex.NE.y
            },
            v2: {
                x: canvasVertex.NE.x,
                y: canvasVertex.NE.y
            },
            v3: {
                x: canvasVertex.NE.x,
                y: canvasVertex.NE.y + canvasImgRatio_V
            },
        },
        south: {
            v1: {
                x: imgVertex.SW.x,
                y: imgVertex.SW.y
            },
            v2: {
                x: canvasVertex.SW.x,
                y: canvasVertex.SW.y
            },
            v3: {
                x: canvasVertex.SW.x + canvasImgRatio_H,
                y: canvasVertex.SW.y
            },
        },
        west: {
            v1: {
                x: imgVertex.NW.x,
                y: imgVertex.NW.y
            },
            v2: {
                x: canvasVertex.NW.x,
                y: canvasVertex.NW.y
            },
            v3: {
                x: canvasVertex.NW.x,
                y: canvasVertex.NW.y + canvasImgRatio_V
            },
        }
    }

    function pixelExtension(step, vertexes, increment) {
        let shapeColor
        for (let i = 0; i < step; i++) {
            shapeColor = get(vertexes.v1.x, vertexes.v1.y)
            fill(shapeColor)
            stroke(shapeColor)
            strokeWeight(1)
            beginShape(TRIANGLES)
            vertex(vertexes.v1.x, vertexes.v1.y)
            vertex(vertexes.v2.x, vertexes.v2.y)
            vertex(vertexes.v3.x, vertexes.v3.y)
            endShape()

            if (increment === canvasImgRatio_H) {
                vertexes.v1.x += 1
                vertexes.v2.x = vertexes.v3.x
                vertexes.v3.x += increment
            } else if (increment === canvasImgRatio_V) {
                vertexes.v1.y += 1
                vertexes.v2.y = vertexes.v3.y
                vertexes.v3.y += canvasImgRatio_V
            }
        }
    }


    pixelExtension(imgWidth, shapeVertex.north, canvasImgRatio_H)
    pixelExtension(imgHeight, shapeVertex.east, canvasImgRatio_V)
    pixelExtension(imgWidth, shapeVertex.south, canvasImgRatio_H)
    pixelExtension(imgHeight, shapeVertex.west, canvasImgRatio_V)


}