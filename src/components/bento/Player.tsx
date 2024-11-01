import React, { useState, useEffect, useRef } from 'react'

const Player = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [timelinePosition, setTimelinePosition] = useState(0)
  const [isMuted, setIsMuted] = useState(false)

  // 오디오 파일 목록
  const playlist = [
    '/static/music/christmas-party-time-249613.mp3',
    '/static/music/deck-the-halls-background-christmas-music-for-video-calesta-version-253224.mp3',
    '/static/music/christmas-short-v1-254790.mp3',
    '/static/music/we-wish-you-a-merry-christmas-bells-background-xmas-music-for-video-256126.mp3',
    '/static/music/enchanted-chimas-177906.mp3',
    '/static/music/cozy-christmas-eve-251739.mp3',
  ]

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play()
        setIsPlaying(true)
      } else {
        audioRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  const handleNext = () => {
    setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length)
  }

  const handlePrev = () => {
    setCurrentTrack((prevTrack) =>
      prevTrack === 0 ? playlist.length - 1 : prevTrack - 1,
    )
  }

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(audioRef.current.muted)
    }
  }

  // 트랙이 변경될 때마다 재생 시작
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentTrack]
      audioRef.current.volume = 0.2 // 초기 볼륨 설정 (0.0에서 1.0 사이)
      audioRef.current.play()
      setIsPlaying(true)
    }
  }, [currentTrack])

  // 오디오 진행 상황 업데이트
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const updateTimeline = () => {
        const progress = (audio.currentTime / audio.duration) * 100
        setTimelinePosition(progress)
      }

      audio.addEventListener('timeupdate', updateTimeline)
      audio.addEventListener('ended', () => setIsPlaying(false))

      return () => {
        audio.removeEventListener('timeupdate', updateTimeline)
      }
    }
  }, [])

  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const time = (Number(e.target.value) / 100) * audioRef.current.duration
      audioRef.current.currentTime = time
      setTimelinePosition(Number(e.target.value))
    }
  }

  return (
    <div className="audio-player">
      <audio ref={audioRef}></audio>
      <div className="controls">
        <button onClick={handlePrev} className="player-button-left">
          {/* 이전 트랙 아이콘 */}◀︎
        </button>

        <button onClick={handlePlayPause} className="player-button h-4 w-4">
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#FFFFFF"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#FFFFFF"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        <button onClick={handleNext} className="player-button-right">
          {/* 다음 트랙 아이콘 */}▶
        </button>

        <input
          type="range"
          className="timeline"
          value={timelinePosition}
          onChange={handleTimelineChange}
          max="100"
        />

        <button onClick={handleMuteToggle} className="sound-button">
          {isMuted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#FFFFFF"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#FFFFFF"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
      <main className="grid min-h-screen place-items-center from-blue-200 to-indigo-900">
        <div>
          <section className="gap-4">
            <div className="rounded-sm bg-gray-900 p-3 shadow-lg">
              <div className="group relative">
                /// TODO
                <div className="absolute top-0 flex h-full w-full items-center justify-evenly rounded bg-black bg-opacity-0 transition group-hover:bg-opacity-60 group-hover:opacity-100">
                  <button className="translate-y-3 transform text-white opacity-0 transition hover:scale-110 group-hover:translate-y-0 group-hover:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  </button>

                  <button className="translate-y-3 transform text-white opacity-0 transition hover:scale-110 group-hover:translate-y-0 group-hover:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="bi bi-play-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                    </svg>
                  </button>

                  <button className="translate-y-3 transform text-white opacity-0 transition hover:scale-110 group-hover:translate-y-0 group-hover:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-three-dots"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg text-white">Epoch</h3>
                <p className="text-gray-400">Tycho</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Player
