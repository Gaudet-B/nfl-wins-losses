import { PropsWithChildren } from 'react'
import {
  PlayButtonContainer,
  ButtonImgContainer,
  ButtonSVGImg,
  ButtonText,
} from './styles'

function Button({
  children,
  onClick,
}: PropsWithChildren<{ onClick: () => void }>) {
  return (
    <button
      className="flex gap-1 h-7 px-2 items-center justify-center"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function PlayButton({
  handleClick,
  isPlaying = false,
}: {
  handleClick: () => void
  isPlaying: boolean
}) {
  return (
    <PlayButtonContainer isPlaying={isPlaying}>
      {!isPlaying && (
        <Button onClick={handleClick}>
          <ButtonImgContainer>
            <ButtonSVGImg />
          </ButtonImgContainer>
          <ButtonText />
        </Button>
      )}
    </PlayButtonContainer>
  )
}
