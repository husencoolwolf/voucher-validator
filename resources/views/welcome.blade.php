@extends('layout.main')

@section('content')
  <div id="loading"></div>
  <div class="container" id="readerSection">
    <div class="row justify-content-center">
      <div class="col-md-5 col-12 text-center">
        <div class="position-absolute" style="z-index: 2;">
          <div class="text-dark">
            <button id="changeCamera" style="display: none" class="btn p-1">
              <div class="fa-stack fa-lg">
                <i class="fa fa-repeat fa-stack-2x fa-inverse"></i>
                <i class="fa fa-camera fa-stack-1x float-left fa-inverse" style="font-size: 0.9rem;"></i>
              </div>
            </button>
          </div>
        </div>
        <div id="reader" width="600px" height="600px"></div>

        <h2>Sound Information</h2>
        <div id="length">Duration:</div>
        <div id="source">Source:</div>
        <div id="status" style="color:red;">Status: Loading</div>
        <hr>
        <h2>Control Buttons</h2>
        <button id="play">Play</button>
        <button id="pause">Pause</button>
        <button id="restart">Restart</button>
        <hr>
        <h2>Playing Information</h2>
        <div id="currentTime">0</div>

      </div>
    </div>
  </div>
@endsection
