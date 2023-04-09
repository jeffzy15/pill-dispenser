enum RadioMessage {
    message1 = 49434,
    Fall = 16412,
    Response = 42258
}
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
radio.onReceivedMessage(RadioMessage.Response, function () {
    fall = false
    music.stopAllSounds()
})
radio.onReceivedMessage(RadioMessage.Fall, function () {
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
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == appointment) {
        basic.showString("Appointment!")
    }
})
input.onButtonPressed(Button.B, function () {
    // TO DEBUG: SERVO NOT WORKING
    if (!(takenMed)) {
        if (grove.measureInCentimetersV2(DigitalPin.P2) <= 10) {
            takenMed = true
            pins.servoWritePin(AnalogPin.P1, 0)
            basic.pause(2000)
            pins.servoWritePin(AnalogPin.P1, 90)
            medCount = medCount - 1
            basic.showNumber(medCount)
            if (medCount < 5) {
                basic.showString("Top up medicine")
            }
        }
    }
})
let fall = false
let medCount = 0
let appointment = ""
let takenMed = false
radio.setGroup(58)
timeanddate.setDate(1, 1, 2023)
timeanddate.setTime(7, 30, 0, timeanddate.MornNight.AM)
takenMed = false
appointment = "" + timeanddate.time(timeanddate.TimeFormat.HMMAMPM) + timeanddate.date(timeanddate.DateFormat.MD)
basic.showString("" + (appointment))
medCount = 25
loops.everyInterval(1, function () {
    timeanddate.advanceBy(1, timeanddate.TimeUnit.Milliseconds)
})
basic.forever(function () {
    if (timeanddate.time(timeanddate.TimeFormat.HMMAMPM) == "7:31am") {
        if (!(takenMed)) {
            music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
            basic.showString("Take pills")
        }
    } else if (timeanddate.time(timeanddate.TimeFormat.HMMAMPM) != "7:32am") {
        if (!(takenMed)) {
            music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
            basic.showString("Take pills")
        }
    }
})
