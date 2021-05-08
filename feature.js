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
    [0, 1],
    //2.2
    [0, 1],
    //2.4
    [3, 1, 4, 0],
    //1.4
    [2, 3, 1, 0],
    //1.8
    [7, 11, 10, 0, 2, 9, 1, 3],
    //0.8
    [0, 1, 8, 2, 3, 6, 10, 11],
    //0.16
    [4, 1, 2, 10, 21, 0, 16, 7, 6, 3, 8, 13, 5, 15, 22, 11],
    //1.16
    [13, 19, 0, 8, 2, 3, 4, 5, 6, 7, 10, 14, 1, 22, 12, 17],
    //1.32
    [26, 21, 15, 9, 23, 39, 4, 46, 24, 7, 29, 32, 0, 11, 14, 38, 35, 1, 5, 47, 22, 3, 2, 37, 33, 12, 13, 6, 34, 8, 10, 44],
    //2.32
    [24, 34, 7, 3, 45, 12, 31, 2, 9, 30, 39, 37, 15, 1, 21, 36, 38, 11, 23, 33, 20, 16, 41, 14, 0, 22, 5, 6, 10, 13, 8, 4],
    //2.64
    [26, 30, 0, 46, 21, 25, 51, 35, 34, 16, 33, 32, 8, 1, 59, 4, 11, 3, 52, 15, 55, 24, 40, 57, 19, 7, 18, 36, 44, 13, 48, 29, 10, 9, 37, 27, 6, 49, 31, 5, 12, 58, 63, 22, 38, 45, 20, 43, 42, 54, 14, 41, 61, 23, 56, 2, 17, 39, 53, 60, 47, 62, 50, 28],
    //3.64
    [29, 32, 7, 33, 27, 3, 16, 54, 0, 56, 51, 31, 10, 20, 25, 37, 13, 41, 48, 18, 34, 9, 40, 44, 6, 4, 1, 17, 43, 57, 61, 28, 21, 5, 12, 46, 23, 59, 50, 35, 2, 15, 19, 53, 60, 49, 45, 30, 58, 39, 42, 8, 11, 63, 26, 24, 36, 22, 55, 52, 38, 47, 62, 14],
    //3.128
    [5, 46, 44, 32, 58, 39, 27, 9, 12, 49, 41, 45, 8, 13, 23, 31, 10, 29, 14, 0, 47, 49, 18, 9, 22, 50, 28, 36, 21, 60, 51, 40, 57, 11, 53, 36, 55, 32, 20, 7, 29, 16, 8, 1, 25, 57, 28, 25, 0, 33, 17, 35, 27, 54, 13, 37, 61, 18, 5, 46, 7, 12, 1, 53, 58, 21, 19, 34, 2, 38, 15, 44, 56, 61, 4, 11, 41, 6, 19, 42, 4, 42, 60, 45, 43, 3, 62, 30, 43, 33, 22, 39, 56, 10, 6, 52, 14, 20, 3, 26, 48, 23, 63, 55, 24, 37, 62, 51, 15, 59, 52, 24, 31, 47, 34, 35, 2, 17, 48, 26, 40, 63, 59, 54, 38, 50, 16, 30]
];

const featFuncs = [
    () => {}
];

const keywords = [
    "major", "marriage", "traffic jam", "insurance", "volcano", "coach", "disaster", "conditions"
];