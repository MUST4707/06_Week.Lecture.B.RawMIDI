/**
 * Reference to the DOM element where MIDI data will be displayed.
 * @type {HTMLElement}
 */
const midiDataDiv = document.getElementById('midiData');

/**
 * Formats a MIDI byte into binary, decimal, and hexadecimal representations.
 * @param {number} byte - The MIDI byte to format.
 * @returns {string} The formatted string with binary, decimal, and hexadecimal values.
 */
const formatByte = function (byte) {
    // Convert the byte to binary, decimal, and hexadecimal formats for display
    return `Bin: ${byte.toString(2).padStart(8, '0')}  Dec: ${byte}  Hex: 0x${byte.toString(16).toUpperCase().padStart(2, '0')}`;
};

/**
 * Handles incoming MIDI messages and displays formatted data.
 * @param {MIDIMessageEvent} event - The MIDI message event containing data.
 */
const onMIDIMessage = function (event) {
    // Start building the output string with a timestamp
    let output = `MIDI Message (timestamp ${event.timeStamp.toFixed(2)}):\n`;

    // Iterate through each byte of MIDI data and format it
    event.data.forEach(byte => {
        output += formatByte(byte) + '\n';
    });

    // Update the text content of the display div with the formatted data
    midiDataDiv.textContent = output;
};

/**
 * Called when MIDI access is successfully obtained.
 * Attaches the MIDI message handler to all available MIDI inputs.
 * @param {MIDIAccess} midiAccess - The MIDI access object.
 */
const onMIDISuccess = function (midiAccess) {
    // Loop through all available MIDI input devices
    for (let input of midiAccess.inputs.values()) {
        // Assign the onMIDIMessage function as the handler for incoming MIDI messages
        input.onmidimessage = onMIDIMessage;
    }
};

/**
 * Called if accessing MIDI devices fails.
 * Displays an error message.
 */
const onMIDIFailure = function () {
    // Notify the user that MIDI access failed
    midiDataDiv.textContent = 'Failed to access MIDI devices.';
};

// Request access to MIDI devices from the browser's Web MIDI API
navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);