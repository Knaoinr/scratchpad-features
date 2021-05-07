const featNames = [
    "Pen", "Eraser", "Color grid", "Large pen", "Pan", "Undo", "Clear all", "Color picker", "Straight line", "Circle", //0-9
    "Oval", "Rectangle", "Calligraphy pen", "Change background color", "Set background image", "Opacity", "Rake", "Color wheel", "Rock stamp", "Grass stamp", //10-19
    "Square eraser", "Soft brush", "Rotate left", "Rotate right", "Bomb", "Small pen", "Swirl", "Double-pronged rake", "Save your image", "Horizontal line", //20-29
    "Vertical line", "Stick figure stamp", "Smudge", "Sparkles", "Vertical mirror", "Horizontal mirror", "Change background image to a suggestion", "Dust", "Interference", "Lamp", //30-39
    "Bloom", "Door stamp", "Background gradient", "Rainbow pen", "Draw your own brush", "Erase & blend rectangle", "Recycling stamp", "Hair stamp", "Turn off all features", "Highlighter", //40-49
    "Lightning", "Heart stamp", "Ice crack", "X-shaped brush", "Mouse pointer stamp", "Grid", "Checkers stamp", "Arrows", "Cloud", "Star stamp", //50-59
    "Very large brush", ":) stamp", "wheee stamp", "Sun stamp" //60-63
];

const featSets = [
    //3.1
    [0],
    //3.2
    [0,1],
    //2.2
    [0,1],
    //2.4
    [0,1,3,4],
    //1.4
    [0,1,3,2],
    //1.8
    [0,1,2,3,9,11,7,10],
    //0.8
    [0,1,2,3,10,11,8,6],
    //0.16
    [0,1,2,3,4,5,6,7,8,10,21,15,22,16,13,11],
    //1.16
    [0,1,2,3,4,5,6,7,8,19,12,14,13,17,10,22],
    //1.32
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,35,34,23,46,22,32,33,44,29,24,21,26,38,37,39,47],
    //2.32
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,24,45,37,39,30,38,31,41,22,23,16,21,20,36,33,34],
    //2.64
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]
];

const featFuncs = [
    () => {}
];