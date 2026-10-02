const input =
    document.getElementById("qrInput");

const generateButton =
    document.getElementById("generateButton");

const clearButton =
    document.getElementById("clearButton");

const downloadButton =
    document.getElementById("downloadButton");

const result =
    document.getElementById("result");

const foregroundColor =
    document.getElementById("foregroundColor");

const backgroundColor =
    document.getElementById("backgroundColor");

const foregroundValue =
    document.getElementById("foregroundValue");

const backgroundValue =
    document.getElementById("backgroundValue");

const styleButtons =
    document.querySelectorAll(".style-option");

const presetButtons =
    document.querySelectorAll(".presets button");


let selectedStyle = "square";

let lastText = "";

let qrCode = null;


/* =====================================
   QR STYLE SETTINGS
===================================== */

const styles = {

    square: {

        dots: "square",

        corners: "square",

        eyes: "square"

    },

    rounded: {

        dots: "rounded",

        corners: "extra-rounded",

        eyes: "dot"

    },

    dots: {

        dots: "dots",

        corners: "dot",

        eyes: "dot"

    },

    soft: {

        dots: "rounded",

        corners: "rounded",

        eyes: "dot"

    },

    bold: {

        dots: "classy",

        corners: "square",

        eyes: "square"

    },

    minimal: {

        dots: "classy-rounded",

        corners: "extra-rounded",

        eyes: "dot"

    }

};


/* =====================================
   CREATE QR
===================================== */

function createQR() {

    if (lastText === "") {

        return;

    }


    result.innerHTML = "";


    const currentStyle =
        styles[selectedStyle];


    qrCode =
        new QRCodeStyling({

            width: 280,

            height: 280,

            type: "canvas",

            data: lastText,

            margin: 8,


            qrOptions: {

                errorCorrectionLevel: "H"

            },


            dotsOptions: {

                type: currentStyle.dots,

                color:
                    foregroundColor.value

            },


            cornersSquareOptions: {

                type:
                    currentStyle.corners,

                color:
                    foregroundColor.value

            },


            cornersDotOptions: {

                type:
                    currentStyle.eyes,

                color:
                    foregroundColor.value

            },


            backgroundOptions: {

                color:
                    backgroundColor.value

            }

        });


    qrCode.append(result);

}


/* =====================================
   GENERATE BUTTON
===================================== */

generateButton.addEventListener(
    "click",
    function() {

        const text =
            input.value.trim();


        if (text === "") {

            alert(
                "Please enter a link or text first."
            );

            input.focus();

            return;

        }


        lastText = text;

        createQR();

    }
);


/* =====================================
   PRESS ENTER TO GENERATE
===================================== */

input.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            generateButton.click();

        }

    }
);


/* =====================================
   STYLE BUTTONS
===================================== */

styleButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {


                styleButtons.forEach(
                    function(item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                selectedStyle =
                    button.dataset.style;


                if (lastText !== "") {

                    createQR();

                }

            }
        );

    }
);


/* =====================================
   FOREGROUND COLOR
===================================== */

foregroundColor.addEventListener(
    "input",
    function() {

        foregroundValue.textContent =
            foregroundColor.value
                .toUpperCase();


        if (lastText !== "") {

            createQR();

        }

    }
);


/* =====================================
   BACKGROUND COLOR
===================================== */

backgroundColor.addEventListener(
    "input",
    function() {

        backgroundValue.textContent =
            backgroundColor.value
                .toUpperCase();


        if (lastText !== "") {

            createQR();

        }

    }
);


/* =====================================
   COLOR PRESETS
===================================== */

presetButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                const fg =
                    button.dataset.fg;

                const bg =
                    button.dataset.bg;


                foregroundColor.value = fg;

                backgroundColor.value = bg;


                foregroundValue.textContent =
                    fg.toUpperCase();

                backgroundValue.textContent =
                    bg.toUpperCase();


                if (lastText !== "") {

                    createQR();

                }

            }
        );

    }
);


/* =====================================
   CLEAR BUTTON
===================================== */

clearButton.addEventListener(
    "click",
    function() {

        input.value = "";

        lastText = "";

        qrCode = null;


        result.innerHTML = `

            <div class="empty-preview">

                <div class="empty-icon">
                    QR
                </div>

                <p>
                    Enter your content<br>
                    to generate your QR
                </p>

            </div>

        `;


        input.focus();

    }
);


/* =====================================
   DOWNLOAD PNG
===================================== */

downloadButton.addEventListener(
    "click",
    function() {

        if (!qrCode) {

            alert(
                "Generate a QR code first."
            );

            return;

        }


        qrCode.download({

            name:
                "QRFlow-QR-Code",

            extension:
                "png"

        });

    }
);