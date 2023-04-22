import { AudioPlayer } from './Audio';

export const audios: { [name: string]: AudioPlayer } = {
	// Scores
	overworld: new AudioPlayer('src/assets/audio/overworld.mp3'),

	// Sound Effects
	doorOpen: new AudioPlayer('src/assets/audio/dooropen.mp3'),
	doorClose: new AudioPlayer('src/assets/audio/doorclose.mp3'),
};

// These prevent multiple of the same kind of audio from being played at the same time
export const audioTracks: { [track: string]: AudioPlayer } = {};
export const playTrackAudio = async (
	track: string,
	audio: AudioPlayer,
	options = { fadeInterval: 0, loop: false },
) => {
	if (audioTracks[track]) {
		await audioTracks[track].stop(options.fadeInterval);
	}
	audioTracks[track] = audio;
	if (options.loop) audio.playLoop(options.fadeInterval);
	else audio.play(options.fadeInterval);
};
