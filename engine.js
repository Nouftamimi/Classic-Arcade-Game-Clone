var Engine = (function(global) {
    var doc = global.document, // window.documet object
        win = global.window, // window.window object
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;

    doc.body.appendChild(canvas); // we wouldn't see anything without lines 24/25 and 30


    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000;
        update(dt);
        render();
        lastTime = now;
        win.requestAnimationFrame(main); // keeps engine looping
    }

    function init() { // init can be considered the ignition to our game engine main
        reset();
        lastTime = Date.now();
        main();
    }


    function update(dt) {
        updateEntities(dt);
        checkCollisions(allEnemy, player);
    }

    function updateEntities(dt) {
        allEnemy.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     *
     * responsible for rendering the entire images that we see
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, coloum;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (coloum = 0; coloum < numCols; coloum++) {
                ctx.drawImage(Resources.get(rowImages[row]), coloum * 101, row * 83);
            }
        }

        renderEntities();
    }

    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemy.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        delete allEnemies;
        delete player;
        allEnemies = [new Enemy(303, 73), new Enemy(10, 156), new Enemy(101, 239)];
        player     = new Player(101, 405);
        
    }


    Resources.load([ // this is the key to our ignition, sets off the ignition.
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init); // init is being invoked here

    global.ctx = ctx; // which translates to window.ctx = ctx;
})(this); // engine is invoked and starts running
