
import QrScanner from './qr-scanner.min.js';

QrScanner.WORKER_PATH = './qr-scanner-worker.min.js';
// Set constraints for the video stream
var constraints = {video: {facingMode: "environment"}, audio: false};// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
            const track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function (error) {
            console.error("Oops. Something is broken.", error);
        });
}// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function () {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    QrScanner.scanImage(document.getElementById("camera--output"))
        .then(result => alert("QR Code : " + result))
        .catch(err => alert(err))
};// Start the video stream when the window loads
window.addEventListener("load", () => {
    cameraStart();

    const qrScanner = new QrScanner(document.getElementById("camera--view"), result => alert("QR Code = " + result));
    qrScanner.start();
}, false);
