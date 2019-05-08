$(() => {

  let player = {
    score: 0,
    incrementScore: function() {
      this.score = this.score +1
    }
  }

  console.log('kill the bastards...')

  const $screenIntro = $('#intro')
  const $screenGame = $('#game')
  const $screenResult = $('#results')


  const $splashScreen = $('.splashScreen')
  const $moleHoles = $('.moleHole')

  const $countDown = $('#countDown')
  const $playerScore = $('#playerScore')
  const $finalScore = $('#finalScore')

  const soundlow = document.querySelector('.soundlow')
  const soundhigh = document.querySelector('.soundhigh')

  let moleTimer = null
  let timer = null
  let clockTimer = null

  function resetTimer(){
    timer = 60
    $countDown.text(timer.toFixed(0))
  }

  function decrementTimer() {
    timer = timer - 0.1
    $countDown.text(timer.toFixed(0))
    checkZero()
  }

  function startTimer() {
    clockTimer = setInterval(decrementTimer, 100)
  }

  function checkZero() {
    if (timer <= 0){
      $countDown.text('TIME UP!')
      clearInterval(moleTimer)
      clearInterval(clockTimer)
      $finalScore.text('score: '+ player.score)
      $screenGame.hide()
      $screenResult.show()
      console.log('show results!')
    }
  }


  function popDownMole(moleToPopDown) {
    $moleHoles.children().eq(moleToPopDown).show()
    $moleHoles.children().eq(moleToPopDown).removeClass('moleUp')
    $moleHoles.children().eq(moleToPopDown).addClass('moleNone')
    $moleHoles.children().eq(moleToPopDown).attr('src','images/moleNone.png')
  }

  function selectMole() {
    const molePopUp = (Math.floor(Math.random() * 22)) //find random mole
    $moleHoles.children().eq(molePopUp).removeClass('moleNone')
    $moleHoles.children().eq(molePopUp).addClass('moleUp')
    $moleHoles.children().eq(molePopUp).attr('src','images/moleUp1.png')
    const moleRemoverTimer = setTimeout(function() {
      popDownMole(molePopUp)
    },800)

  }

  function startMoles() {
    moleTimer = setInterval(selectMole, 1250) //every 1s call popMoles
  }


  $splashScreen.on('mousedown', () => {
    soundhigh.currentTime = 0
    soundhigh.play()
    $screenIntro.hide()
    $screenGame.show()
    startMoles()
    resetTimer()
    startTimer()
  })


  $moleHoles.on('mousedown', (e) => {
    soundlow.currentTime = 0
    soundlow.play()
    if ($(e.target).hasClass('moleUp')) {
      soundhigh.currentTime = 0
      soundhigh.play()
      player.incrementScore()
      $playerScore.text('score: '+ player.score)
      $(e.target).removeClass('moleUp')
      $(e.target).attr('src','images/moleWhacked1.png')
      $(e.target).fadeOut('slow')
      $(e.target).addClass('moleNone')
    }

  })

  $screenResult.on('mousedown', () => location.reload())

})
