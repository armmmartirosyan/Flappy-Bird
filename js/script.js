$(document).ready(function (){
    let gameContainer = $(".game").eq(0);
    let startMenu = $(".start__menu").eq(0);
    let startBtn = $(".start__btn").eq(0);
    let minPipeH = 10;
    let maxPipeH = 60;
    let containerHeight = gameContainer.outerHeight();
    let containerWidth = gameContainer.outerWidth();
    let containerTop = gameContainer.offset().top;
    let containerLeft = gameContainer.offset().left;
    let isPlaySec = true;
    let tPipeG;
    let bPipeG;
    let tPipeGS;
    let bPipeGS;

    function Bird(speedBird){
        this.speed = speedBird;
        this.elem = `<div class='bird'></div>`;
    }

    function Pipes(topPipeHeight, isSecond){
        this.tPipeHeight = Math.floor(topPipeHeight * (maxPipeH - minPipeH) + minPipeH);  //by vh
        this.bPipeHeight = (90 - (90 - maxPipeH - minPipeH)) - this.tPipeHeight;  //by vh
        this.bgImg = "../img/pipe-bottom.png";
        this.width = 10; //by rem
        if(isSecond){
            this.tPipeElem = `<div class='pipe__top__second'></div>`;
            this.bPipeElem = `<div class='pipe__bottom__second'></div>`;
        }else{
            this.tPipeElem = `<div class='pipe__top'></div>`;
            this.bPipeElem = `<div class='pipe__bottom'></div>`;
        }
    }

    function playGame(gameContainer){
        let birdElem =  new Bird(8);
        gameContainer.append(birdElem.elem);
        gameContainer.append(`<p class='score'>Score: 0</p>`);
        let bird = $(".bird").eq(0);
        let birdHeight = bird.height();
        let birdWidth = bird.width();
        let birdTop = bird.position().top;
        let birdLeft = bird.position().left;
        let scoreTag = $(".score").eq(0);
        let score = 0;

        function intervalPipe(){
            let pipe = new Pipes(Math.random());
            gameContainer.append(pipe.tPipeElem, pipe.bPipeElem);
            let tPipe = $(".pipe__top");
            let bPipe = $(".pipe__bottom");

            tPipeG = tPipe.length === 2 ? tPipe.eq(1) : tPipe.eq(0);
            bPipeG = bPipe.length === 2 ? bPipe.eq(1) : bPipe.eq(0);

            tPipe.css({
                "width": `${pipe.width}rem`,
                "height": `${pipe.tPipeHeight}vh`,
                /*"background-image": `url("${pipe.bgImg}")`,*/
                "right": `-${pipe.width}rem`,
            });
            bPipe.css({
                "width": `${pipe.width}rem`,
                "height": `${pipe.bPipeHeight}vh`,
                /*"background-image": `url("${pipe.bgImg}")`,*/
                "right": `-${pipe.width}rem`,
            });

            tPipe.animate({
                left: `-${pipe.width}rem`,
            }, 5000, "linear", function (){
                tPipe.remove();
            });
            bPipe.animate({
                left: `-${pipe.width}rem`,
            }, 5000, "linear", function (){
                bPipe.remove();
            });
        }

        function intervalPipeSec(){
            let pipeS = new Pipes(Math.random(), true);
            gameContainer.append(pipeS.tPipeElem, pipeS.bPipeElem);
            let tPipeS = $(".pipe__top__second");
            let bPipeS = $(".pipe__bottom__second");

            tPipeGS = tPipeS.length === 2 ? tPipeS.eq(1) : tPipeS.eq(0);
            bPipeGS = bPipeS.length === 2 ? bPipeS.eq(1) : bPipeS.eq(0);

            tPipeS.css({
                "width": `${pipeS.width}rem`,
                "height": `${pipeS.tPipeHeight}vh`,
                /*"background-image": `url("${pipeS.bgImg}")`,*/
                "right": `-${pipeS.width}rem`,
            });
            bPipeS.css({
                "width": `${pipeS.width}rem`,
                "height": `${pipeS.bPipeHeight}vh`,
                /*"background-image": `url("${pipeS.bgImg}")`,*/
                "right": `-${pipeS.width}rem`,
            });

            tPipeS.animate({
                left: `-${pipeS.width}rem`,
            }, 5000, "linear", function (){
                tPipeS.remove();
            });
            bPipeS.animate({
                left: `-${pipeS.width}rem`,
            }, 5000, "linear", function (){
                bPipeS.remove();
            });
        }

        function intervalBird(){
            bird.css({
                "top": `+=.3rem`,
            });
            birdTop = bird.position().top;

            if((birdTop + birdHeight >= containerHeight)){
                callGameOver(bird, birdInterval, scoreTag, score);
            }

            if(tPipeG && bPipeG){
                let tPipeHeight = tPipeG.height();
                let tPipeWidth = tPipeG.width();
                let tPipeLeft = tPipeG.position().left;
                let tPipeTop = tPipeG.position().top;
                let bPipeHeight = bPipeG.height();
                let bPipeWidth = bPipeG.width();
                let bPipeTop = bPipeG.position().top;
                let bPipeLeft = bPipeG.position().left;

                if((birdLeft + birdWidth >= tPipeLeft
                        && birdLeft <= tPipeLeft + tPipeWidth
                        && birdTop <= tPipeHeight)
                    || (birdLeft + birdWidth >= bPipeLeft
                        && birdLeft <= bPipeLeft + bPipeWidth
                        && birdTop + birdHeight >= bPipeTop)){
                    callGameOver(bird, birdInterval, scoreTag, score);
                }
            }

            if(tPipeGS && bPipeGS){
                let tPipeHeightS = tPipeGS.height();
                let tPipeWidthS = tPipeGS.width();
                let tPipeLeftS = tPipeGS.position().left;
                let tPipeTopS = tPipeGS.position().top;
                let bPipeHeightS = bPipeGS.height();
                let bPipeWidthS = bPipeGS.width();
                let bPipeTopS = bPipeGS.position().top;
                let bPipeLeftS = bPipeGS.position().left;

                if((birdLeft + birdWidth >= tPipeLeftS
                        && birdLeft <= tPipeLeftS + tPipeWidthS
                        && birdTop <= tPipeHeightS)
                    || (birdLeft + birdWidth >= bPipeLeftS
                        && birdLeft <= bPipeLeftS + bPipeWidthS
                        && birdTop + birdHeight >= bPipeTopS)){
                    callGameOver(bird, birdInterval, scoreTag, score);
                }
            }
        }

        intervalPipe();

        let pipeOutSec = setTimeout(function (){
            intervalPipeSec();
            isPlaySec = true;
        }, 2500);

        let birdInterval = setInterval(function (){
            intervalBird();

            if(tPipeG){
                if(tPipeG.position().left <= 2 - tPipeG.width()){
                    score += 1;
                    scoreTag.html(`Score: ${score}`);
                    intervalPipe();
                }
            }

            if(tPipeGS && isPlaySec){
                if(tPipeGS.position().left <= 2 - tPipeGS.width()){
                    score += 1;
                    scoreTag.html(`Score: ${score}`);
                    intervalPipeSec();
                }
            }
        }, 10);

        $(document).on({
            keydown: function (event){
                if(event.keyCode === 38 && !(bird.position().top - birdHeight < Math.ceil(birdHeight))){
                    bird.css({
                        "transition": "transform 0s",
                        "transform": "rotateZ(-30deg)",
                    });
                    bird.animate({
                        top: `-=${birdElem.speed}rem`,
                    }, 10, function (){
                        bird.css({
                            "transition": "transform 1s",
                            "transform": "rotateZ(0deg)",
                        });
                    });
                }
            },
            touchstart: function(event){
                bird.css({
                    "transition": "transform 0s",
                    "transform": "rotateZ(-30deg)",
                });
                bird.animate({
                    top: `-=${birdElem.speed}rem`,
                }, 10, function (){
                    bird.css({
                        "transition": "transform 1s",
                        "transform": "rotateZ(0deg)",
                    });
                });
            }
        });
    }

    function callGameOver(bird, birdInterval, scoreTag, score){
        bird.css({
           "transform": "rotateZ(-45deg)",
        });
        bird.animate({
            top: "-=5rem",
        }, 400, function (){
            bird.animate({
                top: "+=5rem",
            }, 250, function (){
                bird.remove();
            });
        });

        setTimeout(function (){
            if(tPipeG) tPipeG.remove();
            if(bPipeG) bPipeG.remove();
            if(tPipeGS){
                tPipeGS.css({
                    "right": `-${tPipeGS.width}rem`,
                });
                tPipeGS.remove();
            }
            if(bPipeGS) bPipeGS.remove();
            if(scoreTag) scoreTag.remove();
            isPlaySec = false;
            gameOver(score);
        }, 650);

        if(birdInterval) clearInterval(birdInterval);
    }

    function gameOver(score){
        let overMenuElem = `
            <div class='over__menu'>
                <p class="over__text">Game Over</p>
                <p class="score__text">Final score: ${score}</p>
                <p class="restart__btn">Restart</p>
            </div>
        `;
        gameContainer.append(overMenuElem);
        let overMenu = $(".over__menu").eq(0);
        let restartBtn = $(".restart__btn").eq(0);

        restartBtn.on("click", function (){
            overMenu.animate({
                opacity: "0",
            }, 250, function (){
                overMenu.remove();
            });

            setTimeout(function (){
                playGame(gameContainer);
            }, 250);
        });
    }

    if(gameContainer && startMenu && startBtn){
        startBtn.on("click", function (){
            startMenu.fadeOut(250);

            setTimeout(function (){
                playGame(gameContainer);
            }, 250);
        });
    }
});