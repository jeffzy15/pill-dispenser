def on_received_number(receivedNumber):
    # For demonstration, it is set to 20. Actual value is 5000.
    if receivedNumber < 20:
        pins.digital_write_pin(DigitalPin.P8, 0)
    else:
        pins.digital_write_pin(DigitalPin.P8, 1)
radio.on_received_number(on_received_number)

def on_button_pressed_a():
    basic.show_string(timeanddate.time(timeanddate.TimeFormat.HMMAMPM))
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_received_string(receivedString):
    global fall
    if receivedString == "Fall":
        fall = True
        music.set_volume(255)
        music.start_melody(music.built_in_melody(Melodies.JUMP_DOWN),
            MelodyOptions.FOREVER)
        for index in range(20):
            basic.show_leds("""
                # # # # #
                                # # # # #
                                # # # # #
                                # # # # #
                                # # # # #
            """)
            basic.pause(1)
            basic.show_leds("""
                . . . . .
                                . . . . .
                                . . . . .
                                . . . . .
                                . . . . .
            """)
    else:
        fall = False
        music.stop_all_sounds()
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    global takenMed
    # TO DEBUG: SERVO NOT WORKING
    if not (takenMed):
        if grove.measure_in_centimeters_v2(DigitalPin.P2) <= 10:
            takenMed = True
            pins.servo_write_pin(AnalogPin.P1, 0)
            basic.pause(2000)
            pins.servo_write_pin(AnalogPin.P1, 90)
input.on_button_pressed(Button.B, on_button_pressed_b)

fall = False
takenMed = False
radio.set_group(58)
timeanddate.set_time(7, 30, 0, timeanddate.MornNight.AM)
takenMed = False

def on_every_interval():
    timeanddate.advance_by(1, timeanddate.TimeUnit.MILLISECONDS)
loops.every_interval(1, on_every_interval)

def on_forever():
    if timeanddate.time(timeanddate.TimeFormat.HMMAMPM) == "7:30am":
        if not (takenMed):
            music.start_melody(music.built_in_melody(Melodies.RINGTONE), MelodyOptions.ONCE)
            basic.show_string("Take pills")
    elif timeanddate.time(timeanddate.TimeFormat.HMMAMPM) != "7:30am":
        if not (takenMed):
            music.start_melody(music.built_in_melody(Melodies.RINGTONE), MelodyOptions.ONCE)
            basic.show_string("Take pills")
basic.forever(on_forever)
