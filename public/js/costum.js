// init audio
var success_scan = document.createElement("audio");
success_scan.src = "/audio/scan_success.mp3";
var failed_scan = document.createElement("audio");
failed_scan.src = "/audio/scan_failed.mp3";

$("#readerSection").hide();

$(document).ready(function () {
    // show when loading done
    $("#readerSection").show();
    // cams init
    // This method will trigger user permissions
    const html5QrCode = new Html5Qrcode(/* element id */ "reader");
    var cams;
    var camSelected = 0;
    var camControlBtn = $("button.cameraControl");
    var camChangeBtn = $("button#changeCamera");
    var lastResult,
        countResults = 0;

    Html5Qrcode.getCameras()
        .then((devices) => {
            cams = devices;
            /**
             * devices would be an array of objects of type:
             * { id: "id", label: "label" }
             */
            if (devices && devices.length) {
                var cameraId = devices[0].id;
                // turnOnCamera(html5QrCode);
            }
        })
        .catch((err) => {
            // handle err
        });

    // Function for turn on camera
    function turnOnCamera(api) {
        api.start(
            cams[camSelected].id,
            {
                fps: 10, // Optional, frame per seconds for qr code scanning
                qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
            },
            (decodedText, decodedResult) => {
                // do something when code is read
                if (decodedText !== lastResult) {
                    ++countResults;
                    lastResult = decodedText;
                    // Handle on success condition with the decoded message.
                    success_scan.play();
                }
            },
            (errorMessage) => {
                // parse error, ignore it.
            }
        ).catch((err) => {
            alert(err);
            // Start failed, handle it.
        });
    }
    // Function for turn off camera
    function turnOffCamera(api) {
        api.stop()
            .then((ignore) => {
                // QR Code scanning is stopped.
            })
            .catch((err) => {
                // Stop failed, handle it.
            });
    }

    function cameraControlBtnSetting(
        cameraControlBtnElement,
        cameraChangeBtnElement
    ) {
        //if cam is on
        if ($(cameraControlBtnElement).data("is-on") == true) {
            cameraControlBtnElement.data("is-on", false).html("Start");
            cameraChangeBtnElement.hide();
            //if cam is off
        } else {
            //starting process disable button
            cameraControlBtnElement
                .html("Starting")
                .attr("disabled", "disabled");
            waitForEl("div#qr-shaded-region", function () {
                // after video started
                cameraControlBtnElement
                    .data("is-on", true)
                    .html("Stop")
                    .removeAttr("disabled");
                cameraChangeBtnElement.show();
            });
        }
    }

    function offCameraControlBtnSetting(cameraControlBtnElement) {
        cameraControlBtnElement.data("is-on", false).html("Start");
    }

    function onCameraControlBtnSetting(cameraControlBtnElement) {
        //starting process disable button
        cameraControlBtnElement.html("Starting").attr("disabled", "disabled");
        waitForEl("div#qr-shaded-region", function () {
            // after video started
            cameraControlBtnElement
                .data("is-on", true)
                .html("Stop")
                .removeAttr("disabled");
        });
    }

    function changeCameraControlBtnSetting(cameraControlBtnElement) {
        cameraControlBtnElement.html("Changing").attr("disabled", "disabled");
    }

    function waitForEl(selector, callback) {
        if (jQuery(selector).length) {
            callback();
        } else {
            setTimeout(function () {
                waitForEl(selector, callback);
            }, 100);
        }
    }
    var counter = 0;
    function scanDelayer() {
        if (counter <= 3) {
            setTimeout(function () {
                counter++;
                scanDelayer();
            }, 1000);
        } else {
            counter = 0;
        }
    }

    // Stop or start camera event
    camControlBtn.click(function (e) {
        e.preventDefault();
        if ($(this).data("is-on") == 1) {
            turnOffCamera(html5QrCode);
            cameraControlBtnSetting(camControlBtn, camChangeBtn);
        } else {
            turnOnCamera(html5QrCode);
            cameraControlBtnSetting(camControlBtn, camChangeBtn);
        }
    });

    // change camera event
    camChangeBtn.click(function (e) {
        e.preventDefault();
        if (camSelected + 1 < cams.length) {
            // change camera devices to next list
            camSelected = camSelected + 1;
            // off camera first
            turnOffCamera(html5QrCode);
            // set control camera button to disable and label 'Starting' and hide change camera button
            cameraControlBtnSetting(camControlBtn, camChangeBtn);
            // override control camera button label to 'Changing'
            changeCameraControlBtnSetting(camControlBtn);
            setTimeout(function () {
                // Turn on camera
                turnOnCamera(html5QrCode);
                // while starting..
                // set control camera button to disable and label 'Starting' and hide change camera button
                cameraControlBtnSetting(camControlBtn, camChangeBtn);
                // override control camera button label to 'Changing'
                changeCameraControlBtnSetting(camControlBtn);
            }, 1000);
        } else {
            // change camera devices to first from list
            camSelected = 0;
            // off camera first
            turnOffCamera(html5QrCode);
            // set control camera button to disable and label 'Starting' and hide change camera button
            cameraControlBtnSetting(camControlBtn, camChangeBtn);
            // override control camera button label to 'Changing'
            changeCameraControlBtnSetting(camControlBtn);
            setTimeout(function () {
                // Turn on camera
                turnOnCamera(html5QrCode);
                // while starting..
                // set control camera button to disable and label 'Starting' and hide change camera button
                cameraControlBtnSetting(camControlBtn, camChangeBtn);
                // override control camera button label to 'Changing'
                changeCameraControlBtnSetting(camControlBtn);
            }, 1000);
        }
    });

    // $("#play").on("click", function () {
    //     var obj = document.createElement("audio");
    //     obj.src = "https://freesound.org/data/previews/501/501690_1661766-lq.mp3";
    //     obj.play();
    // });
});
