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

fall = False
radio.set_group(58)
basic.show_string("hr:")

def on_every_interval():
    timeanddate.advance_by(1, timeanddate.TimeUnit.MILLISECONDS)
loops.every_interval(1, on_every_interval)

basic.show_string("hr:")
while not (input.button_is_pressed(Button.B)):
    if input.button_is_pressed(Button.A):
        timeanddate.advance_by(1, timeanddate.TimeUnit.HOURS)
    basic.show_string(timeanddate.time(timeanddate.TimeFormat.HMM))
basic.show_string("min:")
while not (input.button_is_pressed(Button.B)):
    if input.button_is_pressed(Button.A):
        timeanddate.advance_by(1, timeanddate.TimeUnit.MINUTES)
    basic.show_string(timeanddate.time(timeanddate.TimeFormat.HMM))