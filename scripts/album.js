var createSongRow = function(songNumbers, songName, songLength) {
    var template = 
        '<tr class="album-view-song-item">'
            + '<td class="song-item-number" data-song-number="' + songNumbers + '">' + songNumbers + '</td>'
            + '<td class="song-item-title">' + songName + '</td>'
            + '<td class="song-item-duration">' + songLength + '</td>'
        + '</tr>'
        ;
    var $row = $(template);
    var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));
        if (setSong(songNumber) !== null) {
            var currentlyPlayingCell = getSongNumberCell(number);
            currentlyPlayingCell.html(setSong(songNumber));
        }
        if (setSong(songNumber) !== songNumbers) {
            $(this).html(pauseButtonTemplate);
            setSong(songNumber) = songNumbers;
            setSong(songNumber) = currentAlbum.songs[songNumbers -1];
            updatePlayerBarSong();
        } else if (setSong(songNumber) === songNumbers) {
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            setSong(songNumber) = null;
            setSong(songNumber) = null;
        }
    };
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        if(songNumbers !== setSong(songNumber)) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        if (songNumbers !== setSong(songNumber)) {
            songNumberCell.html(songNumbers);
        }
        console.log("songNumbers type is " + typeof songNumbers + "\n and setSong(songNumber) type is " + typeof setSong(songNumber));
    };
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var setSong = function(songNumber){
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function(number){
    return $('.song-item-number[data-song-number="' + number + '"]');
};

var setCurrentAlbum = function(album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
    $albumSongList.empty();
    
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
}

var nextSong = function(){
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, setSong(songNumber));
    
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    setSong(songNumber);
    
    // Update the view
    updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(number);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function(){
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length -1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, setSong(songNumber));
    
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    setSong(songNumber);
    
    updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(number);
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};


var updatePlayerBarSong = function(){
    $('.currently-playing .song-name').text(setSong(songNumber).title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(setSong(songNumber).title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var setSong(songNumber) = null;
var setSong(songNumber) = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready (function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});