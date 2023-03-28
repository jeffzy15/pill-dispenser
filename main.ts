radio.onReceivedNumber(function (receivedNumber) {
    // For demonstration, it is set to 20. Actual value is 5000.
    if (receivedNumber < 20) {
        pins.digitalWritePin(DigitalPin.P1, 0)
    } else {
        pins.digitalWritePin(DigitalPin.P1, 1)
    }
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
let fall = false
radio.setGroup(58)
