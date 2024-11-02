import React, { useState, useEffect, useRef } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const Player = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [timelinePosition, setTimelinePosition] = useState(0)
  const [isMuted, setIsMuted] = useState(false)

  // mx-auto mt-8 grid max-w-[800px] grid-cols-3 gap-5 px-4
  // 오디오 파일 목록
  const playlist = [
    '/static/music/enchanted-chimes-177906.mp3',
    '/static/music/christmas-party-time-249613.mp3',
    '/static/music/deck-the-halls-background-christmas-music-for-video-calesta-version-253224.mp3',
    '/static/music/christmas-short-v1-254790.mp3',
    '/static/music/we-wish-you-a-merry-christmas-bells-background-xmas-music-for-video-256126.mp3',
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
    <div>
      <audio ref={audioRef}></audio>
      {/* 레이어 */}
      <div></div>

      <main className="">
        <div>
          <div className="relative flex h-full w-full flex-col justify-between p-6">
            <div className="flex min-w-0 flex-1 flex-col justify-end overflow-hidden">
              <div className="mt-6 flex items-center justify-center">
                <button
                  onClick={handlePrev}
                  className="rounded-full bg-white p-3 hover:bg-gray-300 focus:outline-none"
                >
                  <svg
                    width="64px"
                    height="64px"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-gray-600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    transform="matrix(-1, 0, 0, 1, 0, 0)"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M16.6598 14.6474C18.4467 13.4935 18.4467 10.5065 16.6598 9.35258L5.87083 2.38548C4.13419 1.26402 2 2.72368 2 5.0329V18.9671C2 21.2763 4.13419 22.736 5.87083 21.6145L16.6598 14.6474Z"
                        fill="#000000"
                      ></path>
                      <path
                        d="M22.75 5C22.75 4.58579 22.4142 4.25 22 4.25C21.5858 4.25 21.25 4.58579 21.25 5V19C21.25 19.4142 21.5858 19.75 22 19.75C22.4142 19.75 22.75 19.4142 22.75 19V5Z"
                        fill="#000000"
                      ></path>
                    </g>
                  </svg>
                </button>

                <button
                  onClick={handlePlayPause}
                  className="mx-4 rounded-full bg-white p-4 hover:bg-gray-300 focus:outline-none"
                >
                  {isPlaying ? (
                    <svg
                      width="64px"
                      height="64px"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-gray-600"
                      fill="#FFFFFF"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z"
                          fill="#000000"
                        ></path>
                        <path
                          d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z"
                          fill="#000000"
                        ></path>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      width="64px"
                      height="64px"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-6 w-6 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.286 3.407A1.5 1.5 0 0 0 6 4.684v14.632a1.5 1.5 0 0 0 2.286 1.277l11.888-7.316a1.5 1.5 0 0 0 0-2.555L8.286 3.407z"
                        fill="#000000"
                      />
                    </svg>
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="rounded-full bg-white p-3 hover:bg-gray-300 focus:outline-none"
                >
                  <svg
                    width="64px"
                    height="64px"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-gray-600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M16.6598 14.6474C18.4467 13.4935 18.4467 10.5065 16.6598 9.35258L5.87083 2.38548C4.13419 1.26402 2 2.72368 2 5.0329V18.9671C2 21.2763 4.13419 22.736 5.87083 21.6145L16.6598 14.6474Z"
                        fill="#000000"
                      ></path>
                      <path
                        d="M22.75 5C22.75 4.58579 22.4142 4.25 22 4.25C21.5858 4.25 21.25 4.58579 21.25 5V19C21.25 19.4142 21.5858 19.75 22 19.75C22.4142 19.75 22.75 19.4142 22.75 19V5Z"
                        fill="#000000"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-1"></div>
        </div>
      </main>
    </div>
  )
}

export default Player
