/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
'use strict';

// Put variables in global scope to make them available to the browser console.
const constraints = window.constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  const video = document.querySelector('video');
  const videoTracks = stream.getVideoTracks();

  console.log('stream',stream)
  console.log('videoTracks',videoTracks)
  
  video.addEventListener('abort', () => console.log('video abort'))
  video.addEventListener('canplay', () => console.log('video canplay'))
  video.addEventListener('canplaythrough', () => console.log('video canplaythrough'))
  video.addEventListener('durationchange', () => console.log('video durationchange'))
  video.addEventListener('emptied', () => console.log('video emptied'))
  video.addEventListener('ended', () => console.log('video ended'))
  video.addEventListener('error', () => console.log('video error'))
  video.addEventListener('loadeddata', () => console.log('video loadeddata'))
  video.addEventListener('loadedmetadata', () => console.log('video loadedmetadata'))
  video.addEventListener('loadstart', () => console.log('video loadstart'))
  video.addEventListener('pause', () => console.log('video pause'))
  video.addEventListener('play', () => console.log('video play'))
  video.addEventListener('playing', () => console.log('video playing'))
  video.addEventListener('progress', () => console.log('video progress'))
  video.addEventListener('ratechange', () => console.log('video ratechange'))
  video.addEventListener('resize', () => console.log('video resize'))
  video.addEventListener('seeked', () => console.log('video seeked'))
  video.addEventListener('seeking', () => console.log('video seeking'))
  video.addEventListener('stalled', () => console.log('video stalled'))
  video.addEventListener('suspend', () => console.log('video suspend'))
  video.addEventListener('timeupdate', () => console.log('video timeupdate'))
  video.addEventListener('volumechange', () => console.log('video volumechange'))
  video.addEventListener('waiting', () => console.log('video waiting'))

  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  if (error.name === 'OverconstrainedError') {
    const v = constraints.video;
    errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
  } else if (error.name === 'NotAllowedError') {
    errorMsg('Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.');
  }
  errorMsg(`getUserMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector('#errorMsg');
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

async function init(e) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
    e.target.disabled = true;
  } catch (e) {
    handleError(e);
  }
}

document.querySelector('#showVideo').addEventListener('click', e => init(e));