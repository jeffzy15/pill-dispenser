radio.onReceivedNumber(function (receivedNumber) {
    // For demonstration, it is set to 20. Actual value is 5000.
    if (receivedNumber < 20) {
        pins.digitalWritePin(DigitalPin.P8, 0)
    } else {
        pins.digitalWritePin(DigitalPin.P8, 1)
    }
})
input.onButtonPressed(Button.A, function () {
    basic.showString(timeanddate.time(timeanddate.TimeFormat.HMMAMPM))
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "Fall") {
        fall = true
        music.setVolume(255)
        music.startMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Forever)
        for (let index = 0; index < 20; index++) {
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `)
            basic.pause(1)
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
        }
    } else {
        fall = false
        music.stopAllSounds()
    }
})
input.onButtonPressed(Button.B, function () {
    // TO DEBUG: SERVO NOT WORKING
    if (!(medicine)) {
        takenMed = true
        pins.servoWritePin(AnalogPin.P1, 90)
    }
})
let fall = false
let medicine = false
let takenMed = false
radio.setGroup(58)
timeanddate.setTime(7, 30, 0, timeanddate.MornNight.AM)
takenMed = false
medicine = false
loops.everyInterval(1, function () {
    timeanddate.advanceBy(1, timeanddate.TimeUnit.Milliseconds)
})
basic.forever(function () {
    if (timeanddate.time(timeanddate.TimeFormat.HMMAMPM) == "7:30am") {
        if (!(takenMed)) {
            music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
            basic.showString("Take pills")
            medicine = true
        }
    } else if (timeanddate.time(timeanddate.TimeFormat.HMMAMPM) != "7:30am") {
        if (!(takenMed)) {
            music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
            basic.showString("Take pills")
            medicine = true
        }
    }
})
