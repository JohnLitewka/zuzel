document.addEventListener("DOMContentLoaded", function(event) {

  let players = []
  let used = []
  let finish = false;
  keyState = {};
  let playing = 0;
  let last = null;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function setInfo(info) {
    document.getElementById('info').innerText = info
  }


  function game() {
    setInfo(' ');
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    function drawBackGround() {
      ctx.rect(0, 0, canvas.width, canvas.height)
      var img = document.getElementById("grass");
      var pat = ctx.createPattern(img, "repeat");
      ctx.fillStyle = pat;
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.arc(200, 200, 195, Math.PI / 2, 3 / 2 * Math.PI);
      ctx.arc(600, 200, 195, 3 / 2 * Math.PI, Math.PI / 2, false);
      ctx.lineWidth = 5;
      ctx.closePath();
      var img = document.getElementById("desert");
      var pat = ctx.createPattern(img, "repeat");
      ctx.fillStyle = pat;
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(200, 200, 60, Math.PI / 2, 3 / 2 * Math.PI);
      ctx.arc(600, 200, 60, 3 / 2 * Math.PI, Math.PI / 2, false);

      var img = document.getElementById("grass");
      var pat = ctx.createPattern(img, "repeat");
      ctx.fillStyle = pat;
      ctx.fill();
      ctx.closePath();
      ctx.stroke();

      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.moveTo(400, 263);
      ctx.lineTo(400, 393);
      ctx.stroke();
      ctx.closePath();

      //checkpointy

      // ctx.beginPath();
      // ctx.moveTo(5, 200);
      // ctx.lineTo(135, 200);
      // ctx.stroke();
      // ctx.closePath();
      //
      // ctx.beginPath();
      // ctx.moveTo(400, 5);
      // ctx.lineTo(400, 135);
      // ctx.stroke();
      // ctx.closePath();
      //
      // ctx.beginPath();
      // ctx.moveTo(665, 200);
      // ctx.lineTo(800, 200);
      // ctx.stroke();
      // ctx.closePath();
    }

    drawBackGround();


    window.addEventListener('keydown', function(e) {
      keyState[e.keyCode || e.which] = true;
    }, true);
    window.addEventListener('keyup', function(e) {
      keyState[e.keyCode || e.which] = false;
    }, true);

    setInterval(() => {
      if (!finish) {
        playing = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackGround();
        for (player of players) {
          player.update();
          player.checkColision();
          player.render();
          players.sort((a, b) => {
            return (a.lap < b.lap) ? 1 : ((b.lap < a.lap) ? -1 : 0);
          });
          if (player.checkFinished()) {
            window.alert('Wygral : ' + player.color)
            finish = true;
            location.reload();
          }
          if (players.length >= 2 && !player.crashed) playing += 1;
        }
        if (players.length >= 2 && playing == 1) {
          for (player of players) {
            if (!player.crashed) last = player
          }
          window.alert('Wygral : ' + last.color)
          finish = true;
          location.reload();
        }
        setInfo(players[0].lap + '/3')
      }
    }, 30)
  }

  setInfo('Wybierz ilość graczy')

  let one = document.getElementById('bt1');
  let two = document.getElementById('bt2');
  let three = document.getElementById('bt3');
  let four = document.getElementById('bt4');
  let textbox = document.getElementById('keyset');
  one.addEventListener('click', () => {
    setInfo(' ')
    textbox.innerText = 'Przycisk gracza 1 : '
    document.addEventListener('keydown', function add(e) {
      players.push(new Player(e.which, 330, 'blue'))
      document.removeEventListener('keydown', add, false);
      textbox.style.display = 'none';
      game()
    })
  })
  two.addEventListener('click', () => {
    setInfo(' ')
    textbox.innerText = 'Przycisk gracza 1 : '
    document.addEventListener('keydown', function add(e) {
      players.push(new Player(e.which, 306, 'blue'))
      document.removeEventListener('keydown', add, false);
      used.push(e.which)
      textbox.innerText = 'Przycisk gracza 2 : ';
      document.addEventListener('keydown', function add(e) {
        if (used.indexOf(e.which) == -1) {
          players.push(new Player(e.which, 347, 'green'))
          document.removeEventListener('keydown', add, false);
          textbox.style.display = 'none';
          game()
        } else setInfo('wybierz inny!')
      })
    })
  })
  three.addEventListener('click', () => {
    setInfo(' ')
    textbox.innerText = 'Przycisk gracza 1 : '
    document.addEventListener('keydown', function add(e) {
      players.push(new Player(e.which, 296, 'blue'))
      document.removeEventListener('keydown', add, false);
      used.push(e.which)
      textbox.innerText = 'Przycisk gracza 2 : ';
      document.addEventListener('keydown', function add(e) {
        if (used.indexOf(e.which) != -1) setInfo('wybierz inny!')
        else {
          used.push(e.which)
          players.push(new Player(e.which, 327, 'green'))
          document.removeEventListener('keydown', add, false);
          textbox.innerText = 'Przycisk gracza 3 : ';
          document.addEventListener('keydown', function add(e) {
            if (used.indexOf(e.which) != -1) setInfo('wybierz inny!')
            else {
              players.push(new Player(e.which, 358, 'orange'))
              document.removeEventListener('keydown', add, false);
              textbox.style.display = 'none'
              game()
            }
          })
        }
      })
    })
  })
  four.addEventListener('click', () => {
    setInfo(' ')
    textbox.innerText = 'Przycisk gracza 1 : '
    document.addEventListener('keydown', function add(e) {
      used.push(e.which);
      players.push(new Player(e.which, 290, 'blue'));
      document.removeEventListener('keydown', add, false);
      textbox.innerText = 'Przycisk gracza 2 : ';
      document.addEventListener('keydown', function add(e) {
        if (used.indexOf(e.which) != -1) setInfo('Wybierz inny!')
        else {
          setInfo(' ');
          used.push(e.which);
          players.push(new Player(e.which, 315, 'green'));
          document.removeEventListener('keydown', add, false);
          textbox.innerText = 'Przycisk gracza 3 : ';
          document.addEventListener('keydown', function add(e) {
            if (used.indexOf(e.which) != -1) setInfo('Wybierz inny!')
            else {
              used.push(e.which);
              setInfo(' ')
              players.push(new Player(e.which, 340, 'orange'));
              document.removeEventListener('keydown', add, false);
              textbox.innerText = 'Przycisk gracza 4';
              document.addEventListener('keydown', function add(e) {
                if (used.indexOf(e.which) != -1) setInfo('Wybierz inny!');
                else {
                  players.push(new Player(e.which, 365, 'yellow'));
                  document.removeEventListener('keydown', add, false);
                  textbox.style.display = 'none'
                  game()
                }
              })
            }
          })
        }
      })
    })
  })
});