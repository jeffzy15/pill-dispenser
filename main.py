def on_received_string(receivedString):
    global fall
    if receivedString == "Fall":
        fall = True
        music.set_volume(255)
        music.start_melody(music.built_in_melody(Melodies.JUMP_DOWN),
            MelodyOptions.FOREVER)
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
    elif receivedString == "Response":
        fall = False
        basic.clear_screen()
        music.stop_melody(MelodyStopOptions.ALL)
    else:
        pass
radio.on_received_string(on_received_string)

fall = False
radio.set_group(58)