/* global zuix */
'use strict';

/*
 * SPAM.JS: This module handles all the processing for the SPAM detection functionality of the app.
 * Tesseract is used to handle OCR capabilities (it gets imported in index.html, hence it can be 
 * referenced here).
 * 
 * TEAM KARMEN - Call for Code!! 
 */

zuix.controller(function (cp) {

    // OCR capabilities..
    const {
        createWorker
    } = Tesseract;

    const worker = createWorker({
        logger: m => writeStatus(m), // Add logger here for Tesseract..
    });
    let up ;
    let value;
    let increment;
    let ceiling;
    // This is the progress bar of the OCR processing..
    const bar = new ldBar(".ldBar", {
        "stroke": '#f00',
        "stroke-width": 10
    });

    const bar2 = new ldBar(".processBar1", {
        "stroke-width": 3
    });

    const bar3 = new ldBar(".processBar2", {
        "stroke-width": 3
    });

    const bar4 = new ldBar(".processBar3", {
        "stroke-width": 3
    });

    // more globals..
    const zx = zuix; // shorthand
    let textToCheck = document.getElementById('spamtext');

    const EMAIL_URL = 'https://isitspam-bff-impressive-shark.mybluemix.net/analyzeEmail';
    const SMS_URL = 'https://isitspam-bff-impressive-shark.mybluemix.net/analyzeSMS';
    let KarmenAPI = EMAIL_URL;

    // create the event handlers and functions for the page.
    cp.create = function () {
        // call function to get stats as soon as page is loaded
        getStats();
        // call function to get covid cyber tips as soon as page is loaded
        getCovidCyberTips();

        // button for "checking spam"..
        cp.field('checkspam').on('click', function (e) {
            if (textToCheck.value === '') {
                alert('Error: you need to specify some text to check.');
            } else {
                processSpamMessage(textToCheck);
            }
        });

        // this is the file upload area - on drag/drop..
        cp.field('spamfileimage').on('drop', function (e) {
            if (e.dataTransfer.files != []) {
                processImageOCR(e.dataTransfer.files[0]);
            }
        });

        // this is the onChange event (if they selected a file, or took a photo)
        cp.field('spamfileimage').on('change', function (e) {
            if (e.target.files != []) {
                processImageOCR(e.target.files[0]);
            }
        });

        // event handler for instructing on how to email Karmen!
        cp.field('copyEmailAddress').on('click', function (e) {
            toggleVisibility('copyEmailPanel', 'form');
        });

        // event handler for copying the email address to the clipboard.
        cp.field('copyToClipboard').on('click', function (e) {
            const el = document.createElement('textarea');
            el.value = 'karmenibm@gmail.com';
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            cp.field('copyToClipboard').html('Email copied to your clipboard!');
        });

        // simple event handler to close the email panel..
        cp.field('emailClose').on('click', function (e) {
            toggleVisibility('form', 'copyEmailPanel');
        });

        cp.field('closeResults').on('click', function (e) {
            // result the form..
            document.getElementById('spamtext').value = '';
            document.getElementById('ckbx-sms').checked = false;
            KarmenAPI = EMAIL_URL;
            toggleVisibility('form', 'results');
            zuix.field('header').show();
        });

        cp.field('ckbx-sms').on('click', function (e) {
            // toggle SMS or Email..
            if (document.getElementById('ckbx-sms').checked) {
                KarmenAPI = SMS_URL;
            } else {
                KarmenAPI = EMAIL_URL;
            }
        });
    };

    /**
     * this function sends the raw `text` either copy/pasted from an email or extracted from 
     * an image via OCR processing..
     *
     * @param {string} textObj the actual text to be processed by our SPAM detection.
     */
    async function processSpamMessage(textObj) {
        // let r = cp.field('spamtext').value;
        // CORS proxy https://cors-anywhere.herokuapp.com/
        let textValue = {
            text: textObj.value
        };
        up = true;
        value = 0;
        increment = 10;
        ceiling = 100;
        toggleVisibility('processing', 'form').then((s) => {
            console.log('processing');
            renderResults(textValue);
            zuix.field('header').hide();
        });
        await setInterval(counter, 600);
    }

    function renderResults(s) {
        zx.$.ajax({
            type: 'POST',
            url: KarmenAPI,
            headers: {
                'X-IBM-Client-Id': '2f09f5ff-a701-48eb-969b-ca1f0f7567a8',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(s),

            success: function (res) {
                let result = JSON.parse(res);
                console.log(result);
                // populate the results first..

                // check the top class response..
                if (result.message.classifier.top_class === "spam") {
                    // how confident?
                    cp.field("resultsPanelContent").css('width', '60%');
                    cp.field("resultsPanelIcon").css('width', '40%');
                    if (result.message.classifier.top_class_confidence > 0.80) {
                        // greater than 80% - then it's HIGH spam..
                        cp.field("processing-title").css('background', 'url("images/logo-red.png") no-repeat');
                        cp.field("resultsPanel").css('background', 'url("images/spam-high-background.png")');
                        cp.field("resultsPanelContent").html(`${Math.round(result.message.classifier.top_class_confidence * 100)}% SPAM`);
                        cp.field("resultsPanelIcon").html('<i class="material-icons icon-lg">bug_report</i>');
                    } else if (result.message.classifier.top_class_confidence > 0.65) {
                        cp.field("processing-title").css('background', 'url("images/logo-orange.png") no-repeat');
                        cp.field("resultsPanel").css('background', 'url("images/spam-med-background.png")');
                        cp.field("resultsPanelContent").html(`${Math.round(result.message.classifier.top_class_confidence * 100)}% SPAM`);
                        cp.field("resultsPanelIcon").html('<i class="material-icons">bug_report</i>');
                    } else {
                        cp.field("processing-title").css('background', 'url("images/logo-yellow.png") no-repeat');
                        cp.field("resultsPanel").css('background', 'url("images/spam-low-background.png")');
                        cp.field("resultsPanelContent").html(`${Math.round(result.message.classifier.top_class_confidence * 100)}% SPAM`);
                        cp.field("resultsPanelIcon").html('<i class="material-icons">bug_report</i>');
                    }
                } else {
                    // fix styling..
                    cp.field("processing-title").css('background', 'url("images/logo-green.png") no-repeat');
                    cp.field("resultsPanelContent").css('width', '90%');
                    cp.field("resultsPanelIcon").css('width', '10%');
                    // how confident?
                    cp.field("resultsPanel").css('background', 'url("images/ham-background.png")');
                    cp.field("resultsPanelContent").html(`${Math.round(result.message.classifier.top_class_confidence * 100)}% NOT SPAM`);
                    cp.field("resultsPanelIcon").html('');
                }
                cp.field("resultsAction").html(`${result.message.recommendations}`);
            },
            error: function (err) {
                alert(`Error: ${JSON.stringify(err)}`);
                // TODO: handle error
            }
        });
    }

    /**
     * This is a utility function to toggle visibility of DIV elements on the SPAM panel (page).
     * You pass it two parameters:
     *    an 'on' div field to switch show visibility 
     *    an 'off' div field to switch off visibility
     * the div field name must be specified in the `data-ui-field` attribute
     *
     * @param {*} on the data-ui-field name of the div to show
     * @param {*} off the data-ui-field name of the div to hide
     * @returns true (just for promisification)..  :P
     */
    function toggleVisibility(on, off) {
        return new Promise(function (resolve, reject) {
            cp.field(off).display('none');
            cp.field(on).display('block');
            resolve(true);
        });
    }



    function counter() {
    if (up == true && value <= ceiling) {
        value += increment

        if (value == ceiling) {
            up = false;
            value = 0;
            toggleVisibility('results', 'processing').then(() => {
                console.log('done');
            })
        }
    }
    bar2.set(value);
    bar3.set(value*2);
    bar4.set(value+5);
    }

    /**
     * This is a utility function to write the status of the OCR processing.
     * This was defined up top as the logger to the OCR worker.
     *
     * @param {object} statusObj the JSON object that gets emitted from TesseractJS
     */
    function writeStatus(statusObj) {
        bar.set(Math.round((statusObj.progress * 100)));
        let s = document.getElementById('statusText');
        s.innerHTML = statusObj.status + '...';
    }

    /**
     * manages the showing/hiding of the status panel and invoking the OCR worker
     *
     * @param {object} p object representing the image to be processed
     */
    function processImageOCR(p) {
        toggleVisibility('ocrProgress', 'form').then((s) => {
            // this fires up the OCR API and get returns extracted text.
            initWorker(p).then((res) => {
                toggleVisibility('form', 'ocrProgress');
                textToCheck.value = res;
            });
        });
    }

    /**
     * This function initialized the OCR works, loads the language and extract the text
     *
     * @param {object} c - object holding the image to be processed
     * @returns returns extracted text.
     */
    async function initWorker(c) {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const {
            data: {
                text
            }
        } = await worker.recognize(c);
        // console.log(text);
        await worker.terminate();
        return text;
    }

    /**
     * This function get statistics on how the app has been used
     * 
     * @returns returns div with stats
     */
    function getStats() {
        zx.$.ajax({
            type: "GET",
            url: "https://isitspam-bff-impressive-shark.mybluemix.net/metrics",
            headers: {
                "X-IBM-Client-Id": "2f09f5ff-a701-48eb-969b-ca1f0f7567a8",
                "Content-Type": "application/json",
            },

            success: function (res) {
                let result = JSON.parse(res);
                cp.field("stats")
                    .append(`<div class="stat-item"><h1>${kFormat(result.message.numAnalyzed)}</h1>
                        <h2>Validation Runs</h2></div>
                        <div class="stat-item"><h1>${kFormat(result.message.classifiers.totals.spam)}</h1>
                        <h2>SPAM detected</h2></div>
                        <div class="stat-item"><h1>${kFormat(result.message.xfeAnalyzed.totalAnalyze)}</h1>
                        <h2>Indicators of Compromise</h2></div>
                        `);
            },
            error: function (err) {
                alert(JSON.stringify(err));
                // TODO: handle error
            },
        });
    }

    function kFormat(num) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'K' : Math.sign(num)*Math.abs(num)
    }

    function getCovidCyberTips() {
        zx.$.ajax({
            type: "GET",
            url: "https://isitspam-bff-impressive-shark.mybluemix.net/securityTip",
            headers: {
                "X-IBM-Client-Id": "2f09f5ff-a701-48eb-969b-ca1f0f7567a8",
                "Content-Type": "application/json",
            },

            success: function (res) {
                let result = JSON.parse(res);
                cp.field("cyberTipItem")
                    .append(`<p>${result.message}</p>`);
            },
            error: function (err) {
                alert(JSON.stringify(err));
                // TODO: handle error
            },
        });
    }
});
