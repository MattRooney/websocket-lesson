var socket = io();

var connectionCount = document.getElementById('connection-count');
var statusMessage = document.getElementById('status-message');
var currentPoll = document.getElementById('vote-count');
var yourVote = document.getElementById('your-vote');

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

socket.on('voteCount', function (votes) {
  currentPoll.innerText = ['A: ' + votes.A,
                           ' B: ' + votes.B,
                           ' C: ' + votes.C,
                           ' D: ' + votes.D]

   var data = {
     // A labels array that can contain any sort of values
     labels: ['A', 'B', 'C', 'D'],
     // Our series array that contains series objects or in this case series data arrays
     series: [
       [votes.A, votes.B, votes.C, votes.D]
     ]
   };

   new Chartist.Line('.ct-chart', data);

});

socket.on('currentVote' ,function(vote) {
  yourVote.innerText = 'You voted for ' + vote;
})
